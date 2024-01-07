import { px2remTransformer } from "@ant-design/cssinjs"
import { ConfigProvider, theme as antdTheme } from "antd"
import ko_KR from "antd/locale/ko_KR"
import { LazyMotion, domAnimation } from "framer-motion"
import usePreferColorScheme from "hooks/usePrefersColorScheme"

import React from "react"

const algorithmList = {
  light: antdTheme.defaultAlgorithm,
  dark: antdTheme.darkAlgorithm,
}

const px2rem = px2remTransformer({
  rootValue: 16, // 32px = 1rem; @default 16
})

function CustomConfigProdiver({ element }) {
  const currentColorSchemeName = usePreferColorScheme()

  return (
    <ConfigProvider
      locale={ko_KR}
      theme={{ algorithm: algorithmList[currentColorSchemeName], hashed: false }}
      componentSize="large">
      <LazyMotion features={domAnimation}>{element}</LazyMotion>
    </ConfigProvider>
  )
}

export default CustomConfigProdiver
