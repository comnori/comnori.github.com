import { Col, Result, Row } from "antd"
import BasicLayout from "components/templates/BasicLayout"
import React from "react"

function NotFoundPage() {
  return (
    <BasicLayout full>
      <Row
        justify={"center"}
        align={"middle"}
        style={{ height: "100%" }}>
        <Col>
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
          />
        </Col>
      </Row>
    </BasicLayout>
  )
}

export default NotFoundPage

export function Head() {
  return <title>Not found</title>
}
