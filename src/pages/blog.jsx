import { FieldTimeOutlined, FileWordOutlined } from "@ant-design/icons"
import { List, Skeleton, Space, Typography } from "antd"
import BasicLayout from "components/templates/BasicLayout"
import { motion } from "framer-motion"
import { graphql, navigate } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { createElement } from "react"

const { Title } = Typography

const IconText = ({ icon, text }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
)

const BlogPage = ({
  location: { pathname, search, hash },
  data: {
    allMdx: {
      edges,
      pageInfo: { totalCount, perPage, pageCount, currentPage },
    },
    file,
  },
}) => {
  const avatarImage = getImage(file)

  const blogList = edges.map(({ node }) => {
    const {
      id,
      excerpt,
      fields: {
        timeToRead: { text, words },
      },
      frontmatter: { title, date, slug, description },
    } = node

    return { title, date, url: slug, id, excerpt, description, timeToRead: text, words }
  })

  const handleListItemClick = url => {
    navigate(`/blog${url}`)
  }

  return (
    <BasicLayout style={{ minHeight: "100%" }}>
      <Typography>
        <Title>Posts</Title>
      </Typography>
      <List
        bordered
        itemLayout="vertical"
        pagination={{ pageSize: perPage, position: "bottom", align: "center", total: totalCount, current: currentPage }}
        dataSource={blogList}
        rowKey={"id"}
        renderItem={({ title, url, description, excerpt, timeToRead, words }) => (
          <motion.div
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 1 }}>
            <List.Item
              actions={[
                <IconText
                  icon={FieldTimeOutlined}
                  text={timeToRead}
                  key="list-post-time-to-read"
                />,
                <IconText
                  icon={FileWordOutlined}
                  text={words}
                  key="list-post-words"
                />,
              ]}
              extra={
                <Space
                  style={{ height: "100%" }}
                  align="center">
                  <Skeleton.Image />
                </Space>
              }
              onClick={() => handleListItemClick(url)}>
              <List.Item.Meta
                title={title}
                description={description}
                avatar={
                  <GatsbyImage
                    image={avatarImage}
                    alt="avatar"
                  />
                }
              />
              {excerpt}
            </List.Item>
          </motion.div>
        )}
      />
    </BasicLayout>
  )
}

export const Head = () => {
  return (
    <>
      <title>Blog</title>
      <meta
        name="desciption"
        content="Developer Comnori's blog"
      />
    </>
  )
}

export const query = graphql`
  query posts {
    allMdx(skip: 0, limit: 10, sort: { frontmatter: { date: DESC } }, filter: { frontmatter: { slug: { ne: null } } }) {
      edges {
        node {
          frontmatter {
            title
            date
            slug
            description
          }
          id
          excerpt(pruneLength: 200)
          fields {
            timeToRead {
              text
              words
            }
          }
        }
      }
      pageInfo {
        totalCount
        perPage
        pageCount
        itemCount
        currentPage
        hasNextPage
        hasPreviousPage
      }
    }
    file(relativePath: { eq: "icon.png" }) {
      childImageSharp {
        gatsbyImageData(width: 91)
      }
    }
  }
`
export default BlogPage
