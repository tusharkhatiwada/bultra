import { StyleSheet, View } from "react-native"

import { Button } from "components/Button"
import { CommonActions } from "@react-navigation/native"
import { FC } from "react"
import { ProfileStackScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Typography } from "components/Typography"
import { useAuthContext } from "context/AuthContext"
import { useTranslation } from "react-i18next"

export type LogoutProps = ProfileStackScreenProps<typeof Routes.main.profile.logout>

export const Logout: FC<LogoutProps> = ({ navigation }) => {
  const { logout } = useAuthContext()
  const { t } = useTranslation()

  const handleLogout = async () => {
    await logout()

    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: Routes.home }] }))
  }

  return (
    <RootView style={styles.container}>
      <View>
        <Typography size="h3">Logout</Typography>
        <Typography>This is the Logout component!</Typography>
      </View>

      <Button onPress={handleLogout}>{t("profile.logout")}</Button>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
})
