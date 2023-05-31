import { Button } from "components/Button"
import { RootView } from "components/RootView"
import { Select } from "components/Select"
import { TextInput } from "components/TextInput"
import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { useAuthContext } from "context/AuthContext"
import { useToastContext } from "context/ToastContext"
import { isNil } from "lodash"
import { MainTabScreenProps } from "models/Navigation"
import { riskLevelsList } from "models/RiskLevels"
import { Routes } from "models/Routes"
import { ScrollView, Spinner, Stack, useTheme } from "native-base"
import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ProfitsList } from "screens/Common/ProfitsList"
import { StorageKey, createSecureStorage } from "services/SecureStorage"
import { GetPlans } from "../../../api/domain/auth"
import { useCheckNeedGoToPlan } from "../../../hooks/auth/useCheckNeedGoToPlan"
import useColorScheme from "../../../hooks/useColorScheme"
import { Plan, ProPlanMock } from "../../../models/Plans"
import { PlansSelector } from "./PlansSelector"

export type HomeProps = MainTabScreenProps<typeof Routes.main.home>

export const Home: FC<HomeProps> = ({ navigation }) => {
  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()
  const storage = createSecureStorage()
  const { showToast } = useToastContext()

  const { t } = useTranslation()

  const { isLoggedIn, setSelectedPlan, user } = useAuthContext()

  // const { plans } = useGetAllPlans(isLoggedIn)

  const [plansToShow, setPlansToShow] = useState<GetPlans.Response>([ProPlanMock])
  const [tradingInitiated, setTradingInitiated] = useState<boolean | undefined>(false)
  const [tradingPaymentCompleted, setTradingPaymentCompleted] = useState<boolean | undefined>(false)
  const [botActivated, setBotActivated] = useState<boolean | undefined>(false)
  const [riskLevel, setRiskLevel] = useState<string | undefined>()

  const handleChangeRiskLevel = (level: string) => {
    setRiskLevel(level)
  }

  const { colors } = useTheme()

  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"

  useEffect(() => {
    const getTradingStatus = async () => {
      const tradingInitated = (await storage.get(StorageKey.INITIATE_TRADING)) as string | null
      const tradingInitiatedVal = !tradingInitated
        ? Boolean(tradingInitated)
        : (JSON.parse(tradingInitated) as boolean)
      const paymentCompleted = (await storage.get(StorageKey.INITIATE_TRADING)) as string | null
      const paymentCompletedVal = !paymentCompleted
        ? Boolean(paymentCompleted)
        : (JSON.parse(paymentCompleted) as boolean)
      const botActivated = (await storage.get(StorageKey.INITIATE_TRADING)) as string | null
      const botActivateddVal = !botActivated
        ? Boolean(botActivated)
        : (JSON.parse(botActivated) as boolean)
      tradingInitiatedVal && setTradingInitiated(tradingInitiatedVal)
      paymentCompletedVal && setTradingPaymentCompleted(paymentCompletedVal)
      botActivateddVal && setBotActivated(botActivateddVal)
    }

    getTradingStatus()
  }, [])

  // useEffect(() => {
  //   // setSelectedPlan(plansToShow[0])
  // }, [])

  /*   useEffect(() => {
    if (!isNil(user) && !isNil(plans)) {
      if (!isNil(user.UserPlan)) {
        const indexOfElement = findIndex(plans, (plan) => user.UserPlan.Plan.name === plan.name)
        if (indexOfElement !== -1) {
          setPlansToShow(plans.filter((plan, index) => indexOfElement < index))
        } else {
          setPlansToShow(plans)
        }
      } else {
        setPlansToShow(plans)
      }
    }
  }, [plans, user]) */
  // Commenting this for now as we are only showing Pro plan statically
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

  // const goToPlans = (selectedPlan?: Plan) => {
  //   navigation.navigate(Routes.auth.navigator, {
  //     screen: Routes.auth.plans,
  //     params: { desiredPlan: selectedPlan, step: 1 },
  //   })
  // }
  const goToStartTrading = () => {
    navigation.navigate(Routes.main.trading.navigator, {
      screen: Routes.main.trading.tradingDetails,
    })
  }

  const activateBot = () => {
    setBotActivated(true)
    showToast({
      type: ToastType.success,
      title: "Success",
      description: "Bot is activated, check your bybit account.",
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

          {/* {!isLoggedIn && ( */}
          <View>
            <Typography size="h3" style={styles.profits}>
              {t("home.profits")}
            </Typography>
            <Typography color="primary.400" style={styles.profitDescription}>
              {t("home.profit-description")}
            </Typography>
            <ProfitsList profitSummary={profitSummary} />
          </View>
          {/* )} */}
        </View>
      </ScrollView>
      <View style={viewStyle}>
        {!isLoggedIn && (
          <Stack space="md">
            <Button onPress={goToSignUp}>{t("createAccount.title")}</Button>
            <Button onPress={() => goToLogin()}>{t("login.title")}</Button>
          </Stack>
        )}

        {/* {!isNil(user) && isLoggedIn && (
          <View style={styles.planName}>
            <Typography color="primary.800">{t("plans.selectSubscription.yourPlanIs")}</Typography>
            <Typography color="primary.800" size="headline" weight="bold" ml="1">
              {!isNil(user.UserPlan)
                ? t(`plans.selectPlan.${PlanTranslationsTypes[user.UserPlan.Plan.name]}`)
                : t(`plans.selectPlan.${PlanTranslationsTypes[PlanTypes.FREE]}`)}
            </Typography>
          </View>
        )} */}
        {isLoggedIn && (
          <>
            {!tradingInitiated && !tradingPaymentCompleted && !botActivated && (
              <>
                <PlansSelector plans={plansToShow as Plan[]} goToPlans={() => null} />
                <Button onPress={() => goToStartTrading()}>{t("home.startEarn")}</Button>
              </>
            )}
            {tradingInitiated && !tradingPaymentCompleted && !botActivated && (
              <>
                <Spinner />
                <Typography color="primary.400">
                  Please, when we receive your payment you will be able to activate the bot
                </Typography>
              </>
            )}
            {tradingInitiated && tradingPaymentCompleted && !botActivated && (
              <Button onPress={activateBot}>Activate Bot</Button>
            )}

            {tradingInitiated && tradingPaymentCompleted && botActivated && (
              <View>
                <TextInput
                  label={t("profile.apiKeys.form.apiKey.label")}
                  placeholder={t("profile.apiKeys.form.apiKey.placeholder")}
                  name="apiKeys"
                />

                <TextInput
                  label={t("profile.apiKeys.form.secretKey.label")}
                  placeholder={t("profile.apiKeys.form.secretKey.placeholder")}
                  name="secretKey"
                />
                <Select
                  custom
                  label={t("profile.apiKeys.chooseRiskLevel")}
                  bottomLabel={t("profile.apiKeys.changeRiskLevel")}
                  cta={t("profile.apiKeys.chooseRiskLevel")}
                  value={riskLevel}
                  options={riskLevelsList}
                  onChange={handleChangeRiskLevel}
                />
                <Button onPress={() => null}>Save</Button>
                <Button onPress={activateBot}>Stop Bot</Button>
              </View>
            )}
          </>
        )}
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
