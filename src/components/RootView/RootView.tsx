import { View, useTheme } from "native-base"

import { FC } from "react"
import { InterfaceViewProps } from "native-base/lib/typescript/components/basic/View/types"

export type RootViewProps = InterfaceViewProps

export const RootView: FC<RootViewProps> = ({ style, children, ...rest }) => {
  const { colors } = useTheme()

  return (
    <View
      _light={{ backgroundColor: colors.white }}
      _dark={{ backgroundColor: colors.black }}
      style={style}
      {...rest}
    >
      {children}
    </View>
  )
}
