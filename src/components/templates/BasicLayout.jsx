import { Layout } from "antd"
import Footer from "components/organisms/Footer"
import Header from "components/organisms/Header"
import React, { useEffect, useState } from "react"
const { Content } = Layout

/**
 * @typedef {Object} BasicLayoutProps
 * @property {React.ReactNode} children - 레이아웃 콘텐츠
 * @property {boolean} [full=false] - 전체화면
 */

/**
 * 화면의 기본적인 레이아웃
 *
 * @param {BasicLayoutProps} props
 * @returns {React.JSX.Element}
 */
const BasicLayout = ({ children, full = false }) => {
  const [layoutStyle, setLayoutStyle] = useState()

  useEffect(() => {
    setLayoutStyle(full ? { height: "100%" } : { minHeight: "100%" })
  }, [full])

  return (
    <Layout style={layoutStyle}>
      <Header />
      <Content style={{ height: "100%", padding: "10px 50px" }}>{children}</Content>
      <Footer />
    </Layout>
  )
}

export default BasicLayout
