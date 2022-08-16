import { FC } from "react"
import { IButtonProps } from "native-base/lib/typescript/components/primitives/Button/types"
import { Button as NBButton } from "native-base"

export type ButtonProps = IButtonProps

export const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <NBButton w="100%" accessibilityLabel={children as string} {...rest}>
      {children}
    </NBButton>
  )
}
