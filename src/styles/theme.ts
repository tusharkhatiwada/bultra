import { darkColors, lightColors } from "./colors"
import { fonts, themeFontSizes, themeLineHeights } from "./typography"

import { extendTheme } from "native-base"
import { themeButton } from "components/Button/Button.styles"

export const createTheme = (theme: "dark" | "light" = "light") => {
  const colors = theme === "dark" ? darkColors : lightColors

  return extendTheme({
    colors,
    fontConfig: fonts,
    fonts: {
      heading: "Canaro",
      body: "Canaro",
      mono: "Canaro",
    },
    lineHeights: themeLineHeights,
    fontSizes: themeFontSizes,
    config: {
      initialColorMode: theme,
    },
    components: {
      Button: themeButton,
    },
  })
}
