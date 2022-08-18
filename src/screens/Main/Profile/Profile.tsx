import { FC, useState } from "react"
import { StyleSheet, View } from "react-native"

import { Button } from "components/Button"
import { CommonActions } from "@react-navigation/native"
import { MainTabScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Typography } from "components/Typography"
import { changeLanguage } from "i18next"
import { useAuthContext } from "context/AuthContext"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useTranslation } from "react-i18next"

export type ProfileProps = MainTabScreenProps<typeof Routes.main.profile>

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

    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: Routes.main.navigator }] }),
    )
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
