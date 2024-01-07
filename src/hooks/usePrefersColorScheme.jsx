import { useEffect, useRef, useState } from "react"

/**
 * OS에 설정된 Theme를 감시하여 변경사항이 생기면 theme name을 제공
 *
 * @readonly
 * @returns {"dark" | "light"}
 * @example
 * const currentColorSchemeName = usePreferColorScheme()
 */

const darkColorSchemeMatcher = window.matchMedia("(prefers-color-scheme: dark)")

function usePreferColorScheme() {
  const preferColorSheme = useRef(darkColorSchemeMatcher)

  useEffect(() => {
    const currentPreferColorSheme = preferColorSheme.current

    function handlePreferColorSchemeChange() {
      setColorSchemeName(currentPreferColorSheme.matches ? "dark" : "light")
    }

    currentPreferColorSheme.addEventListener("change", handlePreferColorSchemeChange)

    //set initialState
    handlePreferColorSchemeChange()

    return () => {
      // cleanup
      currentPreferColorSheme.removeEventListener("change")
    }
  }, [])

  const [colorSchemeName, setColorSchemeName] = useState(darkColorSchemeMatcher.matches ? "dark" : "light")

  return colorSchemeName
}

export default usePreferColorScheme
