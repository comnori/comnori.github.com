import { Divider } from "antd"
import Typography from "antd/es/typography/Typography"
import React, { createRef, useEffect } from "react"

const { Title } = Typography

export const Comments = () => {
  const commentsInjectionRoot = createRef()

  useEffect(() => {
    if (commentsInjectionRoot.current?.children.length === 0) {
      const scriptEl = document.createElement("script")
      scriptEl.setAttribute("src", "https://utteranc.es/client.js")
      scriptEl.setAttribute("crossorigin", "anonymous")
      scriptEl.setAttribute("async", "true")
      scriptEl.setAttribute("repo", process.env.GATSBY_UTTERANC_REPO)
      scriptEl.setAttribute("theme", process.env.GATSBY_UTTERANC_THEME)
      scriptEl.setAttribute("label", process.env.GATSBY_UTTERANC_LABEL)
      scriptEl.setAttribute("issue-term", process.env.GATSBY_UTTERANC_ISSUE_TERM)
      commentsInjectionRoot.current?.appendChild(scriptEl)
    }
  }, [])

  return (
    <div>
      <Typography>
        <Title level={2}>Comment</Title>
        <Divider />
      </Typography>
      <div
        ref={commentsInjectionRoot}
        style={{ minHeight: "300px" }}
      />
    </div>
  )
}
