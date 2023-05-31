export const fonts = {
  Canaro: {
    100: {
      normal: "Canaro-Light",
      italic: "Canaro-LightItalic",
    },
    200: {
      normal: "Canaro-Light",
      italic: "Canaro-LightItalic",
    },
    300: {
      normal: "Canaro-Light",
      italic: "Canaro-LightItalic",
    },
    400: {
      normal: "Canaro-Book",
      italic: "Canaro-BookItalic",
    },
    500: {
      normal: "Canaro-Medium",
      italic: "Canaro-MediumItalic",
    },
    600: {
      normal: "Canaro-Medium",
      italic: "Canaro-MediumItalic",
    },
    700: {
      normal: "Canaro-Bold",
      italic: "Canaro-BoldItalic",
    },
    800: {
      normal: "Canaro-Bold",
      italic: "Canaro-BoldItalic",
    },
    900: {
      normal: "Canaro-Bold",
      italic: "Canaro-BoldItalic",
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
