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
      allMdx {
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

  // you'll call `createPage` for each result
  posts.forEach(node => {
    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path: `${postsBase}${node.frontmatter.slug}`,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
}
