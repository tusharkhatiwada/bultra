import { FontSizeTypes, themeSizeMapper } from "styles/typography"
import { ITextProps, Text } from "native-base"

import { FC } from "react"

export type TypographyProps = Omit<ITextProps, "size"> & {
  size?: FontSizeTypes
  align?: "left" | "center" | "right"
}

export const Typography: FC<TypographyProps> = ({
  size = "body",
  align = "left",
  children,
  ...rest
}) => {
  const headingSizes = ["h1", "h2", "h3"]
  const isHeading = headingSizes.includes(size)

  return (
    <Text
      fontSize={themeSizeMapper[size]}
      lineHeight={themeSizeMapper[size]}
      textAlign={align}
      bold={isHeading}
      {...rest}
    >
      {children}
    </Text>
  )
}
