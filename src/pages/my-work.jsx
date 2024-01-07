import { Typography } from "antd"
import WorkList from "components/organisms/WorkList"
import BasicLayout from "components/templates/BasicLayout"
import { releaseList, workingList } from "config/workList"
import * as React from "react"

const { Title } = Typography

const MyWorkPage = () => {
  return (
    <BasicLayout>
      <Typography>
        <Title>My Work</Title>
        <Title level={2}>Working</Title>
      </Typography>
      <WorkList dataSource={workingList} />
      <Typography>
        <Title level={2}>Release</Title>
      </Typography>
      <WorkList dataSource={releaseList} />
    </BasicLayout>
  )
}

export const Head = () => {
  return (
    <>
      <title>My works</title>
      <meta
        name="desciption"
        content="Introduction to ongoing or completed development projects"
      />
    </>
  )
}

export default MyWorkPage
