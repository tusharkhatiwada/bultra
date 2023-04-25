import { ScrollView, Spinner, Stack, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"
import { findIndex, isNil } from "lodash"

import { Button } from "components/Button"
import { FC, useEffect, useState } from "react"
import { MainTabScreenProps } from "models/Navigation"
import { ProfitsList } from "screens/Common/ProfitsList"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Typography } from "components/Typography"
import { useAuthContext } from "context/AuthContext"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import { PlansSelector } from "./PlansSelector"
import { useGetAllPlans } from "../../../hooks/auth/useGetAllPlans"
import { Plan, PlanTranslationsTypes, PlanTypes } from "../../../models/Plans"
import { useCheckNeedGoToPlan } from "../../../hooks/auth/useCheckNeedGoToPlan"
import useColorScheme from "../../../hooks/useColorScheme"
import { GetPlans } from "../../../api/domain/auth"

export type HomeProps = MainTabScreenProps<typeof Routes.main.home>

export const Home: FC<HomeProps> = ({ navigation }) => {
  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()

  const { t } = useTranslation()

  const { isLoggedIn, setSelectedPlan, user } = useAuthContext()

  const { plans } = useGetAllPlans()

  const [plansToShow, setPlansToShow] = useState<GetPlans.Response | undefined>(undefined)

  const { colors } = useTheme()

  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"

  useEffect(() => {
    if (!isNil(user) && !isNil(plans)) {
      const indexOfElement = findIndex(plans, (plan) => user.UserPlan.Plan.name === plan.name)
      if (indexOfElement !== -1) {
        setPlansToShow(plans.filter((plan, index) => indexOfElement < index))
      } else {
        setPlansToShow(plans)
      }
    }
  }, [plans, user])

  useCheckNeedGoToPlan({ navigationProps: navigation })

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

  const goToPlans = (selectedPlan?: Plan) => {
    navigation.navigate(Routes.auth.navigator, {
      screen: Routes.auth.plans,
      params: { desiredPlan: selectedPlan, step: 1 },
    })
  }

  const viewStyle = {
    backgroundColor: isDarkMode ? colors.black : "#ffff",
    paddingHorizontal: space[6],
    paddingBottom: bottom + space[6],
  }

  const profitSummary = {
    last24hours: 1.45,
    last7days: -3.33,
    lastMonth: 6.32,
  }

  return (
    <RootView style={styles.container}>
      <ScrollView
        style={{
          paddingHorizontal: space[6],
          paddingTop: top + space[6],
          paddingBottom: bottom + space[6],
        }}
        showsVerticalScrollIndicator={false}
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
      </ScrollView>
      <View style={viewStyle}>
        {!isLoggedIn && (
          <Stack space="md">
            <Button onPress={goToSignUp}>{t("createAccount.title")}</Button>
            <Button onPress={() => goToLogin()}>{t("login.title")}</Button>
          </Stack>
        )}

        {!isNil(user) && isLoggedIn && (
          <View style={styles.planName}>
            <Typography color="primary.800">{t("plans.selectSubscription.yourPlanIs")}</Typography>
            <Typography color="primary.800" size="headline" weight="bold" ml="1">
              {!isNil(user.UserPlan.Plan)
                ? t(`plans.selectPlan.${PlanTranslationsTypes[user.UserPlan.Plan.name]}`)
                : t(`plans.selectPlan.${PlanTranslationsTypes[PlanTypes.FREE]}`)}
            </Typography>
          </View>
        )}

        {!isNil(plansToShow)
          ? isLoggedIn && <PlansSelector plans={plansToShow} goToPlans={goToPlans} />
          : isLoggedIn && <Spinner />}

        {/*<ButtonBar onChange={() => {}} buttons={dateFilterButtons} defaultValue={"month"} />*/}
        {/*{user?.status === UserStatus.MISSING_PLAN && (*/}
        {/*  <Button onPress={goToPlans}>{t("plans.title")}</Button>*/}
        {/*)}*/}
      </View>
    </RootView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  planName: {
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "baseline",
  },
})
