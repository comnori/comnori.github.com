import path from "path"
import readingTime from "reading-time"

export const onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    createNodeField({ node, name: `timeToRead`, value: readingTime(node.body) })
  }
}

export const onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve("src"), "node_modules"],
    },
  })
}

export const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx(filter: {frontmatter: {slug: {ne: null}}}) {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors)
  }

  // Create blog post pages.
  const posts = result.data.allMdx.nodes
  const postsBase = "/blog"
  const postTemplate = path.resolve("./src/components/templates/PostTemplate.jsx")

  posts.forEach(node => {
    createPage({
      path: `${postsBase}${node.frontmatter.slug}`,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    })
  })
}
