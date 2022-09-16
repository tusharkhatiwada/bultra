import { Button as NBButton, Spinner } from "native-base"
import { StyleSheet, View } from "react-native"

import { FC } from "react"
import { IButtonProps } from "native-base/lib/typescript/components/primitives/Button/types"

export type ButtonProps = IButtonProps

export const Button: FC<ButtonProps> = ({ children, isLoading, ...rest }) => {
  return (
    <NBButton w="100%" accessibilityLabel={children as string} {...rest}>
      {isLoading ? (
        <View style={styles.spinner}>
          <Spinner color="primary.100" />
        </View>
      ) : (
        children
      )}
    </NBButton>
  )
}

const styles = StyleSheet.create({
  spinner: {
    minHeight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
})
