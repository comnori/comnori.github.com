import { SyncOutlined } from "@ant-design/icons"
import { Card, Col, Descriptions, Flex, Row, Tag, Timeline, Typography } from "antd"
import TechStack from "components/markdown/tech-stack.mdx"
import WorkList from "components/organisms/WorkList"
import BasicLayout from "components/templates/BasicLayout"
import { releaseList, workingList } from "config/workList"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"

const { Title, Text } = Typography

const descItemList = [
  {
    key: "1",
    label: "Name",
    children: "Yongsik Yun",
  },
  {
    key: "2",
    label: "BirthDay",
    children: "1983.10.29",
  },
  {
    key: "5",
    label: "Career",
    children: "10 year +",
  },
  {
    key: "4",
    label: "Status",
    children: (
      <Tag
        icon={<SyncOutlined spin />}
        color="processing">
        Looking for a job
      </Tag>
    ),
    span: 3,
  },
]

const timelineItemList = [
  {
    label: "2022.10 ~ 2022.12",
    children: (
      <>
        <Tag color="processing">Freelance</Tag>DTOL Co., Ltd.
      </>
    ),
  },
  {
    label: "2022.04 ~ 2022.07",
    children: (
      <>
        <Row>
          <Col>
            <Tag color="success">Full-time</Tag>Abydos Co., Ltd.
          </Col>
        </Row>
        <Row>
          <Col>Institute of Technology</Col>
        </Row>
        <Row>
          <Col>Director of Research Institute</Col>
        </Row>
      </>
    ),
  },
  {
    label: "2016.01 ~ 2022.04",
    children: (
      <>
        <Row>
          <Col>
            <Tag color="success">Full-time</Tag>DTOL Co., Ltd.
          </Col>
        </Row>
        <Row>
          <Col>Institute of Technology</Col>
        </Row>
        <Row>
          <Col>Director of Research Institute</Col>
        </Row>
      </>
    ),
  },
  {
    label: "2015.09 ~ 2016.01",
    children: (
      <>
        <Row>
          <Col>
            <Tag color="processing">Freelance</Tag>Broadbase Co.
          </Col>
        </Row>
        <Row>
          <Col>Full-stack web developer</Col>
        </Row>
      </>
    ),
  },
  {
    label: "2011.01 ~ 2015.04",
    children: (
      <>
        <Row>
          <Col>
            <Tag color="success">Full-time</Tag>Abydos Co., Ltd.
          </Col>
        </Row>
        <Row>
          <Col>Full-stack web developer</Col>
        </Row>
      </>
    ),
  },
]

const IndexPage = ({ data: { file } }) => {
  const cardImage = getImage(file)

  return (
    <BasicLayout>
      <Row justify={"center"}>
        <Col>
          <Card>
            <Flex justify="space-between">
              <GatsbyImage
                image={cardImage}
                style={{ display: "block" }}
                alt="avatar"
              />
              <Flex
                vertical
                align="flex-end"
                justify="space-between"
                style={{ padding: 32 }}>
                <Typography>
                  <Title>Hello, I'm Yongsik Yun! 🤚</Title>
                  <Title level={2}>- A FULL-STACK WEB DEVELOPER</Title>
                  <Title level={3}>Creating new things through development is my highest art. </Title>
                </Typography>
              </Flex>
            </Flex>
          </Card>
        </Col>
        <Col>
          <Typography>
            <Title>My Career</Title>
            <Descriptions
              title="User Info"
              bordered
              items={descItemList}
            />
            <Title level={2}>Career</Title>
            <Timeline
              mode="left"
              items={timelineItemList}
            />
          </Typography>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col>
          <Typography>
            <Title
              level={2}
              className="page-break">
              Tech Stack
            </Title>
            <TechStack />
          </Typography>
        </Col>
      </Row>
      <div id="for-print">
        <Row>
          <Col>
            <Typography>
              <Title level={2}>Release</Title>
              <WorkList dataSource={releaseList} />
              <Title level={2}>Working</Title>
              <WorkList dataSource={workingList} />
            </Typography>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col>
            <Text>
              You can view the resume at <Link to="https://comnori.github.com">https://comnori.github.com</Link>.
            </Text>
          </Col>
        </Row>
      </div>
    </BasicLayout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "icon.png" }) {
      childImageSharp {
        gatsbyImageData(width: 512)
      }
    }
  }
`

export default IndexPage

export const Head = () => {
  return (
    <>
      <title>Home Page</title>
      <meta
        name="desciption"
        content="Developer Comnori's homepage"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
      />
    </>
  )
}
