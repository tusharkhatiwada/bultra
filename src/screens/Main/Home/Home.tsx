import { Spinner, Stack, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"

import { Button } from "components/Button"
import { FC } from "react"
import { MainTabScreenProps } from "models/Navigation"
import { ProfitsList } from "screens/Common/ProfitsList"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Typography } from "components/Typography"
import { useAuthContext } from "context/AuthContext"
import { useGetWallet } from "hooks/wallet/useGetWallet"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"

export type HomeProps = MainTabScreenProps<typeof Routes.main.home>

export const Home: FC<HomeProps> = ({ navigation }) => {
  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()

  const { t } = useTranslation()

  const { isLoggedIn } = useAuthContext()

  const { wallet } = useGetWallet()

  const goToSignUp = () => {
    navigation.navigate(Routes.auth.navigator, {
      screen: Routes.auth.create_account,
    })
  }

  const goToLogin = () => {
    navigation.navigate(Routes.auth.navigator, {
      screen: Routes.auth.login,
    })
  }

  const goToPlans = () => {
    navigation.navigate(Routes.auth.navigator, {
      screen: Routes.auth.plans,
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
      <View>
        <Typography size="h3" style={styles.title}>
          {t("home.greetings")}
        </Typography>

        <Typography color="primary.400" style={styles.description}>
          {t("home.description")}
        </Typography>

        <Typography size="h3" style={styles.profits}>
          {t("home.profits")}
        </Typography>

        <Typography color="primary.400" style={styles.profitDescription}>
          {t("home.profit-description")}
        </Typography>
      </View>

      {wallet && wallet.profitSummary ? (
        <ProfitsList profitSummary={wallet.profitSummary} />
      ) : (
        <Spinner />
      )}

      {isLoggedIn && <Button onPress={goToPlans}>{t("plans.title")}</Button>}
      {!isLoggedIn && (
        <Stack space="md">
          <Button onPress={goToSignUp}>{t("createAccount.title")}</Button>
          <Button variant="outline" onPress={goToLogin}>
            {t("login.title")}
          </Button>
        </Stack>
      )}
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 24,
  },
  profits: {
    marginBottom: 8,
  },
  profitDescription: {
    marginBottom: 28,
  },
})
