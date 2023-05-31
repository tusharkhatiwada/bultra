import { FC, useMemo } from "react"
import { FontSizeTypes, themeSizeMapper } from "styles/typography"
import { ITextProps, Text } from "native-base"

export type TypographyProps = Omit<ITextProps, "size" | "bold" | "fontWeight"> & {
  size?: FontSizeTypes
  align?: "left" | "center" | "right"
  weight?: "regular" | "semibold" | "bold"
}

export const Typography: FC<TypographyProps> = ({
  size = "body",
  align = "left",
  weight = "regular",
  children,
  ...rest
}) => {
  const headingSizes = ["h1", "h2", "h3"]

  const isHeading = headingSizes.includes(size)

  const fontFamily = useMemo(() => {
    if (isHeading || weight === "bold") return "Canaro-Bold"
    if (weight === "semibold") return "Canaro-Medium"

    return "Canaro-Book"
  }, [isHeading])

  return (
    <Text
      fontSize={themeSizeMapper[size]}
      lineHeight={themeSizeMapper[size]}
      textAlign={align}
      fontFamily={fontFamily}
      {...rest}
    >
      {children}
    </Text>
  )
}
