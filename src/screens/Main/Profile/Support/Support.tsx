import { FC } from "react"
import { ProfileStackScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { StyleSheet } from "react-native"
import { Typography } from "components/Typography"

export type SupportProps = ProfileStackScreenProps<typeof Routes.main.profile.support>

export const Support: FC<SupportProps> = () => {
  return (
    <RootView style={styles.container}>
      <Typography size="h3">Support</Typography>
      <Typography>This is the Support component!</Typography>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
