import { AuthStackScreenProps } from "models/Navigation"
import { FC } from "react"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { StyleSheet } from "react-native"
import { Typography } from "components/Typography"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"

export type PlansProps = AuthStackScreenProps<typeof Routes.auth.plans>

export const Plans: FC<PlansProps> = () => {
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()

  return (
    <RootView
      style={[
        styles.container,
        {
          paddingHorizontal: space[6],
          paddingBottom: bottom + space[6],
        },
      ]}
    >
      <Typography size="h3">Plans</Typography>
      <Typography>This is the Plans component!</Typography>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
