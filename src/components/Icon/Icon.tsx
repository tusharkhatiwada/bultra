import { FC } from "react"
import { FontAwesome5 } from "@expo/vector-icons"
import { InterfaceIconProps } from "native-base/lib/typescript/components/primitives/Icon/types"
import { Icon as PrimitiveIcon } from "native-base"
import { StyleSheet } from "react-native"

export type IconProps = Omit<InterfaceIconProps, "size"> & {
  size?: IconSizes
}

export type IconSizes =
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"

export const Icon: FC<IconProps> = ({ name, size = "lg", style, ...rest }) => {
  return (
    <PrimitiveIcon as={FontAwesome5} size={size} style={[styles.container, style]} {...rest}>
      <FontAwesome5 name={name} size={sizeMapper[size]} />
    </PrimitiveIcon>
  )
}

const sizeMapper = {
  "2xs": 4,
  xs: 8,
  sm: 10,
  md: 14,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  "4xl": 32,
  "5xl": 36,
  "6xl": 40,
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
})
