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
  h2: 36,
  h3: 32,
  h4: 28,
  h5: 24,
  h6: 24,
  headline: 20,
  body: 18,
  small: 14,
  mini: 12,
} as const

export const LineHeights = {
  h1: 44,
  h2: 40,
  h3: 36,
  h4: 32,
  h5: 28,
  h6: 28,
  headline: 24,
  body: 22,
  small: 18,
  mini: 18,
} as const

export type FontSizeTypes = keyof typeof FontSizes
export type LineHeightTypes = keyof typeof LineHeights

export const themeLineHeights = {
  "6xl": LineHeights.h1,
  "5xl": LineHeights.h2,
  "4xl": LineHeights.h3,
  "3xl": LineHeights.h4,
  "2xl": LineHeights.h5,
  xl: LineHeights.h6,
  lg: LineHeights.headline,
  md: LineHeights.body,
  sm: LineHeights.small,
  xs: LineHeights.mini,
}

export const themeFontSizes = {
  "6xl": FontSizes.h1,
  "5xl": FontSizes.h2,
  "4xl": FontSizes.h3,
  "3xl": FontSizes.h4,
  "2xl": FontSizes.h5,
  xl: FontSizes.h6,
  lg: FontSizes.headline,
  md: FontSizes.body,
  sm: FontSizes.small,
  xs: FontSizes.mini,
}

export const themeSizeMapper = {
  h1: "6xl",
  h2: "5xl",
  h3: "4xl",
  h4: "3xl",
  h5: "2xl",
  h6: "xl",
  headline: "lg",
  body: "md",
  small: "sm",
  mini: "xs",
}
