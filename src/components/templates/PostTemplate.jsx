import { MDXProvider } from "@mdx-js/react"
import { Divider, Typography } from "antd"
import { graphql } from "gatsby"
import React from "react"
import BasicLayout from "./BasicLayout"

const { Title, Paragraph } = Typography

const components = {
  hr: Divider,
  p: Paragraph,
  wrapper({ components, ...rest }) {
    return <Typography {...rest} />
  },
}

export default function PostTemplate({ data, children }) {
  return (
    <BasicLayout style={{ minHeight: "100%" }}>
      <Title>{data.mdx.frontmatter.title}</Title>
      <MDXProvider components={components}>{children}</MDXProvider>
    </BasicLayout>
  )
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`
export const Head = ({
  data,
  pageContext: {
    frontmatter: { title, description },
  },
}) => {
  return (
    <>
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
    </>
  )
}
