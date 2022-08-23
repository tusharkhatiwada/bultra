import { FC } from "react"
import { ProfileStackScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { StyleSheet } from "react-native"
import { Typography } from "components/Typography"

export type LogoutProps = ProfileStackScreenProps<typeof Routes.main.profile.logout>

export const Logout: FC<LogoutProps> = () => {
  return (
    <RootView style={styles.container}>
      <Typography size="h3">Logout</Typography>
      <Typography>This is the Logout component!</Typography>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
