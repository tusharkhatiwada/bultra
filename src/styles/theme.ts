import { darkColors, lightColors } from "./colors"

import { extendTheme } from "native-base"
import { fonts } from "./typography"

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
    config: {
      initialColorMode: theme,
    },
  })
}
