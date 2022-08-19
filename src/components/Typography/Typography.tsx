import { FC, useMemo } from "react"
import { FontSizeTypes, themeSizeMapper } from "styles/typography"
import { ITextProps, Text } from "native-base"

export type TypographyProps = Omit<ITextProps, "size"> & {
  size?: FontSizeTypes
  align?: "left" | "center" | "right"
}

export const Typography: FC<TypographyProps> = ({
  size = "body",
  align = "left",
  bold = false,
  children,
  ...rest
}) => {
  const headingSizes = ["h1", "h2", "h3", "headline"]

  const isHeading = headingSizes.includes(size)
  const isBold = isHeading || bold

  const fontFamily = useMemo(() => {
    if (isHeading) return "Ubuntu-Bold"
    if (bold) return "Ubuntu-Medium"

    return "Ubuntu-Regular"
  }, [isHeading, bold])

  return (
    <Text
      fontSize={themeSizeMapper[size]}
      lineHeight={themeSizeMapper[size]}
      textAlign={align}
      fontFamily={fontFamily}
      bold={isBold}
      {...rest}
    >
      {children}
    </Text>
  )
}
