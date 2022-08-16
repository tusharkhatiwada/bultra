import { FC } from "react"
import { MainTabScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { StyleSheet } from "react-native"
import { Typography } from "components/Typography"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"

export type HomeProps = MainTabScreenProps<typeof Routes.main.home>

export const Home: FC<HomeProps> = () => {
  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()

  return (
    <RootView
      style={[
        styles.container,
        {
          paddingHorizontal: space[6],
          paddingTop: top + space[6],
          paddingBottom: bottom + space[6],
        },
      ]}
    >
      <Typography size="h3">Home</Typography>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
