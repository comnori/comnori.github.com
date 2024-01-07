import Icon from "@ant-design/icons/lib/components/Icon"
import { Card, Divider, List, Space, Tag, Typography, Watermark } from "antd"
import { Link } from "gatsby"
import * as React from "react"

const { Text } = Typography

const WorkList = ({ dataSource }) => {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 3,
      }}
      rowKey={"key"}
      dataSource={dataSource}
      renderItem={({ title, url, description, tags, icon, isPrivate }) => (
        <List.Item>
          <Watermark
            content={isPrivate ? "Private" : ""}
            height={16}>
            <Card
              title={title}
              extra={
                <Link
                  to={url}
                  target="_blank"
                  rel="author noreferrer">
                  <Icon
                    component={icon}
                    style={{ fontSize: "2em" }}
                  />
                </Link>
              }
              hoverable>
              <Typography>
                <Text>{description}</Text>
                <Divider />
                <Space wrap>
                  {tags.map((value, idx) => (
                    <Tag key={idx}>{value}</Tag>
                  ))}
                </Space>
              </Typography>
            </Card>
          </Watermark>
        </List.Item>
      )}
    />
  )
}

export default WorkList
