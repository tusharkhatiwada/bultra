import { FC, useState } from "react"

import { Button } from "components/Button"
import { MainTabScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { StyleSheet } from "react-native"
import { Typography } from "components/Typography"
import { changeLanguage } from "i18next"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useTranslation } from "react-i18next"

export type AccountProps = MainTabScreenProps<typeof Routes.main.account>

export const Account: FC<AccountProps> = ({ navigation }) => {
  const [language, setLanguage] = useState("en-GB")

  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()

  const { t } = useTranslation()

  const goToLogin = () => {
    navigation.navigate(Routes.auth.navigator, {
      screen: Routes.auth.login,
    })
  }

  const goToSignUp = () => {
    navigation.navigate(Routes.auth.navigator, {
      screen: Routes.auth.signup,
    })
  }

  const handleChangeLanguage = () => {
    const newLanguage = language === "en-GB" ? "es-ES" : "en-GB"
    changeLanguage(newLanguage)
    setLanguage(newLanguage)
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
      <Typography size="h3" style={styles.button}>
        {t("account.title")}
      </Typography>

      <Button onPress={goToLogin} style={styles.button}>
        {t("login.title")}
      </Button>
      <Button onPress={goToSignUp} style={styles.button}>
        {t("signup.title")}
      </Button>

      <Button onPress={handleChangeLanguage} style={styles.button}>
        {language === "en-GB" ? "English" : "Español"}
      </Button>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  button: {
    marginBottom: 24,
  },
})
