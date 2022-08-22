export const accentColors = {
  white: "#FFFFFF",
  black: "#000000",
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
}

const toastColors = (theme: "light" | "dark") => ({
  error: {
    300: accentColors.red[theme],
  },
  info: {
    300: accentColors.blue[theme],
  },
  success: {
    300: accentColors.green[theme],
  },
  warning: {
    300: accentColors.yellow[theme],
  },
})

export const colors = {
  primary: {
    100: "#F4F4F5",
    200: "#E4E4E7",
    300: "#D4D4D8",
    400: "#A1A1AA",
    500: "#71717A",
    600: "#52525B",
    700: "#3F3F46",
    800: "#27272A",
    900: "#18181B",
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

export const lightColors = { ...colors, ...toastColors("light") }
export const darkColors = { ...colors, ...toastColors("dark") }
