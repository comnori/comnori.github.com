import { EditOutlined, IdcardOutlined, ProjectOutlined } from "@ant-design/icons"
import { Col, Layout, Menu, Row } from "antd"
import { navigate } from "gatsby"
import React from "react"

const { Header: AntdHeader } = Layout

const itemList = [
  {
    label: "About ME",
    key: "home",
    icon: <IdcardOutlined />,
  },
  {
    label: "My Works",
    key: "app",
    icon: <ProjectOutlined />,
  },
  {
    label: "Blog",
    key: "blog",
    icon: <EditOutlined />,
  },
]

const urlList = {
  home: "/",
  app: "/my-work",
  blog: "/blog",
}

const Header = () => {
  function handleMenuCLick({ key }) {
    navigate(urlList[key])
  }

  return (
    <AntdHeader>
      <Row justify="space-between">
        <Col flex={"auto"}>
          <Menu
            theme="dark"
            mode="horizontal"
            items={itemList}
            onClick={handleMenuCLick}
          />
        </Col>
      </Row>
    </AntdHeader>
  )
}

export default Header
