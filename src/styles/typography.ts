export const fonts = {
  Ubuntu: {
    100: {
      normal: "Ubuntu-Light",
      italic: "Ubuntu-LightItalic",
    },
    200: {
      normal: "Ubuntu-Light",
      italic: "Ubuntu-LightItalic",
    },
    300: {
      normal: "Ubuntu-Light",
      italic: "Ubuntu-LightItalic",
    },
    400: {
      normal: "Ubuntu-Regular",
      italic: "Ubuntu-Italic",
    },
    500: {
      normal: "Ubuntu-Medium",
      italic: "Ubuntu-MediumItalic",
    },
    600: {
      normal: "Ubuntu-Medium",
      italic: "Ubuntu-MediumItalic",
    },
    700: {
      normal: "Ubuntu-Bold",
      italic: "Ubuntu-BoldItalic",
    },
    800: {
      normal: "Ubuntu-Bold",
      italic: "Ubuntu-BoldItalic",
    },
    900: {
      normal: "Ubuntu-Bold",
      italic: "Ubuntu-BoldItalic",
    },
  },
}

export const FontSizes = {
  h1: 40,
  h2: 32,
  h3: 24,
  headline: 20,
  body: 16,
  small: 14,
  mini: 12,
} as const

export const LineHeights = {
  h1: 60,
  h2: 48,
  h3: 36,
  headline: 30,
  body: 24,
  small: 20,
  mini: 18,
} as const

export type FontSizeTypes = keyof typeof FontSizes
export type LineHeightTypes = keyof typeof LineHeights

export const themeLineHeights = {
  "3xl": LineHeights.h1,
  "2xl": LineHeights.h2,
  xl: LineHeights.h3,
  lg: LineHeights.headline,
  md: LineHeights.body,
  sm: LineHeights.small,
  xs: LineHeights.mini,
}

export const themeFontSizes = {
  "3xl": FontSizes.h1,
  "2xl": FontSizes.h2,
  xl: FontSizes.h3,
  lg: FontSizes.headline,
  md: FontSizes.body,
  sm: FontSizes.small,
  xs: FontSizes.mini,
}

export const themeSizeMapper = {
  h1: "3xl",
  h2: "2xl",
  h3: "xl",
  headline: "lg",
  body: "md",
  small: "sm",
  mini: "xs",
}
