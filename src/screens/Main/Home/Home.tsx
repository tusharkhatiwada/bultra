import { Button } from "components/Button"
import { FC } from "react"
import { MainTabScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { StyleSheet } from "react-native"
import { Typography } from "components/Typography"
import { useAuthContext } from "context/AuthContext"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useTranslation } from "react-i18next"

export type HomeProps = MainTabScreenProps<typeof Routes.main.home>

export const Home: FC<HomeProps> = ({ navigation }) => {
  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()

  const { t } = useTranslation()

  const { isLoggedIn } = useAuthContext()

  const goToSignUp = () => {
    navigation.navigate(Routes.auth.navigator, {
      screen: Routes.auth.create_account,
    })
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
      <Typography size="h3">{t("home.title")}</Typography>

      {!isLoggedIn && <Button onPress={goToSignUp}>{t("createAccount.title")}</Button>}
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
})
