import { RootView } from "components/RootView"
import { Typography } from "components/Typography"
import { useTheme } from "native-base"
import { StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const StartTrading = () => {
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
      <Typography color="primary.400" style={styles.description}>
        Go to Internal transfer and withdraw to the next email:
      </Typography>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    justifyContent: "space-between",
  },
  description: {
    marginBottom: 24,
  },
})
