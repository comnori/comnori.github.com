import { GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons"
import { Col, Divider, Layout, Row, Space, Typography } from "antd"
import * as React from "react"

const { Text, Link } = Typography
const { Footer: AntdFooter } = Layout
const Footer = () => {
  return (
    <AntdFooter>
      <Row justify={"center"}>
        <Col>
          <Space align="center">
            <Link
              href="https://www.linkedin.com/in/yongsik-yun-36260344/"
              target="_blank"
              rel="author noreferrer">
              <LinkedinOutlined style={{ fontSize: "3em" }} />
            </Link>
            <Link
              href="https://github.com/comnori"
              target="_blank"
              rel="author noreferrer">
              <GithubOutlined style={{ fontSize: "3em" }} />
            </Link>
          </Space>
        </Col>
      </Row>
      <Row justify={"center"}>
        <Col>
          <Space align="center">
            <Space split={<Divider type="vertical" />}>
              <Text>© All rights are reserved. 2020</Text>
              <Space>
                <MailOutlined />
                <Typography.Link
                  href="mailto:comnori@gmail.com"
                  rel="author">
                  Yongsik Yun
                </Typography.Link>
              </Space>
            </Space>
          </Space>
        </Col>
      </Row>
    </AntdFooter>
  )
}

export default Footer
