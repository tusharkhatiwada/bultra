export const accentColors = {
  white: "#FFFFFF",
  black: "#5E24FF",
  red: {
    light: "#FCA5A5",
    dark: "#DC2626",
  },
  green: {
    light: "#E8F8F4",
    dark: "#52B89E",
  },
  blue: {
    light: "#EBF0FF",
    dark: "#2380D7",
  },
  yellow: {
    light: "#FDF4E1",
    dark: "#EEB74D",
  },
  gold: "#FFC93E",
}

const toastColors = () => ({
  error: {
    300: accentColors.red.light,
    400: accentColors.red.dark,
  },
  info: {
    300: accentColors.blue.light,
    400: accentColors.blue.dark,
  },
  success: {
    300: accentColors.green.light,
    400: accentColors.green.dark,
  },
  warning: {
    300: accentColors.yellow.light,
    400: accentColors.yellow.dark,
  },
})

export const colors = {
  primary: {
    100: "#F4F4F5",
    200: "#FEADFF",
    300: "#D78BFF",
    400: "#A1A1AA",
    500: "#B069FF",
    600: "#52525B",
    700: "#3F3F46",
    800: "#8848FF",
    900: "#5E24FF",
  },
  secondary: {
    100: "#EDEEF3",
    200: "#D7DDE5",
    300: "#B9C0CA",
    400: "#A2ABB9",
    500: "#8891A0",
    600: "#6F7886",
    700: "#535A64",
    800: "#383C43",
    900: "#0E0F11",
  },
  white: "#FFFFFF",
  black: "#000000",
  accentColors, // TODO:  Type this correctly
} as const

export const lightColors = { ...colors, ...toastColors() }
export const darkColors = { ...colors, ...toastColors() }
