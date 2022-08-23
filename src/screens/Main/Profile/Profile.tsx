import { FC, useState } from "react"
import { StyleSheet, View } from "react-native"

import { Button } from "components/Button"
import { CommonActions } from "@react-navigation/native"
import { ProfileStackScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Typography } from "components/Typography"
import { changeLanguage } from "i18next"
import { useAuthContext } from "context/AuthContext"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useTranslation } from "react-i18next"

export type ProfileProps = ProfileStackScreenProps<typeof Routes.main.profile.userProfile>

export const Profile: FC<ProfileProps> = ({ navigation }) => {
  const [language, setLanguage] = useState("en-GB")

  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()

  const { t } = useTranslation()
  const { isLoggedIn, logout } = useAuthContext()

  const handleChangeLanguage = () => {
    const newLanguage = language === "en-GB" ? "es-ES" : "en-GB"
    changeLanguage(newLanguage)
    setLanguage(newLanguage)
  }

  const handleLogout = async () => {
    await logout()

    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: Routes.home }] }))
  }

  const goToSupport = async () => {
    navigation.navigate(Routes.main.profile.support)
  }

  const goToChangePassword = async () => {
    navigation.navigate(Routes.main.profile.changePassword)
  }

  const goToLogout = async () => {
    navigation.navigate(Routes.main.profile.logout)
  }

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
      <View>
        <Typography size="h3" style={styles.button}>
          {t("profile.title")}
        </Typography>

        <Button onPress={handleChangeLanguage} style={styles.button}>
          {language === "en-GB" ? "English" : "Español"}
        </Button>

        <Button onPress={goToSupport} style={styles.button}>
          Support
        </Button>

        <Button onPress={goToChangePassword} style={styles.button}>
          Change Password
        </Button>

        <Button onPress={goToLogout} style={styles.button}>
          Logout
        </Button>
      </View>

      {isLoggedIn && <Button onPress={handleLogout}>{t("profile.logout")}</Button>}
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  button: {
    marginBottom: 24,
  },
})
