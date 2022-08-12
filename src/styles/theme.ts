import { darkColors, lightColors } from "./colors"
import { fonts, themeFontSizes, themeLineHeights } from "./typography"

import { extendTheme } from "native-base"

export const createTheme = (theme: "dark" | "light" = "light") => {
  const colors = theme === "dark" ? darkColors : lightColors

  return extendTheme({
    colors,
    fontConfig: fonts,
    fonts: {
      heading: "Ubuntu",
      body: "Ubuntu",
      mono: "Ubuntu",
    },
    lineHeights: themeLineHeights,
    fontSizes: themeFontSizes,
    config: {
      initialColorMode: theme,
    },
  })
}
