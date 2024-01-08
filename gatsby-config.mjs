import dotenv from "dotenv"

import { access, constants } from "node:fs"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkExternalLinks from "remark-external-links"
import remarkGfm from "remark-gfm"

function setupDotEnv(dotEnvFile) {
  dotenv.config({
    path: dotEnvFile,
    debug: process.env.NODE_ENV === "development",
    override: true,
  })
}

const dotEnvFiles = [".env", `.env.${process.env.NODE_ENV}`]

dotEnvFiles.forEach(dotEnvFile => {
  access(dotEnvFile, constants.F_OK, err => {
    // Skip : Even if the file cannot be read, the build process must proceed.
    if (err) {
      console.warn(`${dotEnvFile} does not exists`)
    }

    setupDotEnv(dotEnvFile)
  })
})

const config = {
  siteMetadata: {
    title: `Developer Yongsik Yun!`,
    siteUrl: `https://comnori.github.com`,
    twitterUsername: `@comnori`,
    image: `src/images/icon.png`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`${process.env.GOOGLE_ANALYTICS_ACCOUNT}`],
        pluginConfig: {
          head: true,
          respectDNT: true,
          exclude: [],
          delayOnRouteUpdate: 0,
        },
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
              prompt: {
                user: "comnori",
                host: "comnori.co.kr",
                global: true,
              },
              escapeEntities: {},
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          `gatsby-remark-responsive-iframe`,
        ],
        mdxOptions: {
          remarkPlugins: [remarkGfm, [remarkExternalLinks, { target: false }]],
          rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: `wrap` }]],
        },
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 50,
          breakpoints: [480, 576, 768, 992, 1200, 1600],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `./src/posts/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `import-markdown`,
        path: `./src/components/markdown/`,
      },
    },
  ],
}

export default config
