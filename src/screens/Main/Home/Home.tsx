import { Spinner, Stack, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"
import { isNil } from "lodash"

import { Button } from "components/Button"
import { FC, useEffect } from "react"
import { MainTabScreenProps } from "models/Navigation"
import { ProfitsList } from "screens/Common/ProfitsList"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Typography } from "components/Typography"
import { UserStatus } from "models/Profile"
import { useAuthContext } from "context/AuthContext"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import { PlansSelector } from "./PlansSelector"
import { useGetAllPlans } from "../../../hooks/auth/useGetAllPlans"
import { Plan, PlanTranslationsTypes, PlanTypes } from "../../../models/Plans"

export type HomeProps = MainTabScreenProps<typeof Routes.main.home>

export const Home: FC<HomeProps> = ({ navigation }) => {
  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()

  const { t } = useTranslation()

  const { isLoggedIn, user, setSelectedPlan, selectedPlan, userV2 } = useAuthContext()

  const { plans } = useGetAllPlans()

  useEffect(() => {
    const userPlan =
      !isNil(userV2) && !isNil(userV2.UserPlan) ? userV2.UserPlan.Plan.name : PlanTypes.FREE

    if (isLoggedIn && !isNil(selectedPlan) && selectedPlan.name !== userPlan) {
      navigation.navigate(Routes.auth.navigator, {
        screen: Routes.auth.plans,
        params: {
          desiredPlan: selectedPlan,
          step: 2,
        },
      })
    }
  }, [userV2, isLoggedIn, selectedPlan])

  const goToSignUp = () => {
    navigation.navigate(Routes.auth.navigator, {
      screen: Routes.auth.create_account,
    })
  }

  const goToLogin = (selectedPlan?: Plan) => {
    setSelectedPlan(isNil(selectedPlan) ? null : selectedPlan)
    navigation.navigate(Routes.auth.navigator, {
      screen: Routes.auth.login,
    })
  }

  const goToPlans = () => {
    navigation.navigate(Routes.auth.navigator, {
      screen: Routes.auth.plans,
    })
  }

  const profitSummary = {
    last24hours: 1.45,
    last7days: -3.33,
    lastMonth: 6.32,
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

      <ProfitsList profitSummary={profitSummary} />

      {!isNil(plans) ? (
        !isLoggedIn && <PlansSelector plans={plans} goToLogin={goToLogin} />
      ) : (
        <Spinner />
      )}

      {!isLoggedIn && (
        <Stack space="md">
          <Button onPress={goToSignUp}>{t("createAccount.title")}</Button>
          <Button variant="outline" onPress={() => goToLogin()}>
            {t("login.title")}
          </Button>
        </Stack>
      )}

      {!isNil(userV2) && (
        <Typography color="primary.400" style={styles.profitDescription}>
          {t("plans.selectSubscription.yourPlanIs", {
            plan: !isNil(userV2.UserPlan)
              ? t(`plans.selectPlan.${PlanTranslationsTypes[userV2.UserPlan.Plan.name]}`)
              : t(`plans.selectPlan.${PlanTranslationsTypes[PlanTypes.FREE]}`),
          })}
        </Typography>
      )}
      {user?.status === UserStatus.MISSING_PLAN && (
        <Button onPress={goToPlans}>{t("plans.title")}</Button>
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
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
  },
  profits: {
    marginBottom: 5,
  },
  profitDescription: {
    marginBottom: 5,
  },
})
