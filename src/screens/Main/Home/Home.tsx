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
import { useStartTrade } from "hooks/trade/useStartTrade"
import { useActivateBot } from "hooks/trade/useActivateBot"
import { useActivateBotForm } from "hooks/trade/useActivateBotForm"
import { useStopBot } from "hooks/trade/useStopBot"

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
  const [userTradingEmail, setUserTradingEmail] = useState<string>("")
  const [userId, setUserId] = useState<string>("")
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [readyToActivate, setReadyToActivate] = useState(false)
  const [botRunning, setBotRunning] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const {
    data: paymentData,
    isLoading: paymentDataLoading,
    isError,
  } = useStartTrade({
    email_address: userTradingEmail,
    startTrading: Boolean(tradingInitiated),
  })

  const {
    activateBot: activateBotApi,
    data: activateData,
    isSuccess: isActivateSuccess,
  } = useActivateBot()

  const { stopBot, isLoading: isStopping, data: stopData, isSuccess: isStopSuccess } = useStopBot()

  const handleChangeRiskLevel = (level: string) => {
    setRiskLevel(level)
  }

  const { colors } = useTheme()

  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"

  useEffect(() => {
    const getTradingStatus = async () => {
      const userEmail =
        ((await storage.get(StorageKey.USER_TRADING_EMAIL)) as string) ||
        ((await storage.get(StorageKey.USER_EMAIL)) as string)
      setUserTradingEmail(userEmail)
      const userId = (await storage.get(StorageKey.ACCESS_TOKEN)) as string
      setUserId(userId)
      const tradingInitated = (await storage.get(StorageKey.INITIATE_TRADING)) as string | null
      const tradingInitiatedVal = !tradingInitated
        ? Boolean(tradingInitated)
        : (JSON.parse(tradingInitated) as boolean)
      // const paymentCompleted = (await storage.get(StorageKey.INITIATE_TRADING)) as string | null
      // const paymentCompletedVal = !paymentCompleted
      //   ? Boolean(paymentCompleted)
      //   : (JSON.parse(paymentCompleted) as boolean)
      const botActivated = (await storage.get(StorageKey.BOT_ACTIVATED)) as string | null
      const botActivateddVal = !botActivated
        ? Boolean(botActivated)
        : (JSON.parse(botActivated) as boolean)
      // const botRunning = (await storage.get(StorageKey.BOT_RUNNING)) as string | null
      // const botRunningdVal = !botRunning ? Boolean(botRunning) : (JSON.parse(botRunning) as boolean)
      tradingInitiatedVal && setTradingInitiated(tradingInitiatedVal)
      //   paymentCompletedVal && setTradingPaymentCompleted(paymentCompletedVal)
      botActivateddVal && setBotActivated(botActivateddVal)
      //   botRunningdVal && setBotRunning(botRunningdVal)
    }

    getTradingStatus()
  }, [])

  useEffect(() => {
    if (paymentData?.message?.includes("recognize") || paymentData?.message?.includes("failure")) {
      showToast({
        type: ToastType.error,
        title: "User doesn't have bybit account or the transaction failed",
      })
      storage.set(StorageKey.INITIATE_TRADING, "false")
      setTradingInitiated(false)
    }
    if (paymentData?.message?.includes("processing")) {
      setPaymentProcessing(true)
      setTradingInitiated(true)
    }
    if (paymentData?.message?.includes("ready")) {
      setPaymentProcessing(false)
      setReadyToActivate(true)
      setTradingInitiated(true)
      showToast({
        type: ToastType.success,
        title: "Ready to activate",
      })
    }
  }, [paymentData])
  useEffect(() => {
    if (tradingInitiated) {
      if (isActivateSuccess && activateData.message?.includes("successfully saved")) {
        setPaymentSuccess(true)
        setBotRunning(true)
        storage.set(StorageKey.BOT_RUNNING, "true")
        showToast({
          type: ToastType.success,
          title: "Bot is paid and activated",
        })
      }
      if (activateData?.message?.includes("user was")) {
        setPaymentSuccess(true)
        setBotRunning(true)
        storage.set(StorageKey.BOT_RUNNING, "true")
        storage.set(StorageKey.BOT_ACTIVATED, "true")
        setBotActivated(true)
        showToast({
          type: ToastType.error,
          title: "The user is already activated",
        })
      }
      // else {
      //   showToast({
      //     type: ToastType.error,
      //     title: "Unable to activate bot",
      //   })
      // }
    }
  }, [isActivateSuccess, activateData, tradingInitiated])

  useEffect(() => {
    if (stopData && stopData?.message?.includes("bot stopped")) {
      setBotRunning(false)
      setTradingInitiated(false)
      storage.set(StorageKey.INITIATE_TRADING, "false")
      storage.set(StorageKey.BOT_RUNNING, "false")
      showToast({
        type: ToastType.success,
        title: "Bot is stopped",
      })
    }
  }, [stopData])

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
  // useCheckNeedGoToPlan({ navigationProps: navigation })

  const { getTextFieldProps, handleSubmit, dirty, isValid } = useActivateBotForm({
    onSubmit: ({ key, secret }) => {
      if (!riskLevel) {
        return showToast({
          type: ToastType.error,
          title: "Select Risk Level",
        })
      }

      activateBotApi(
        {
          key,
          secret,
          risk_level: riskLevel as string,
          user_id: userId,
          email_address: userTradingEmail,
        },
        {
          onSuccess: () => {
            showToast({
              type: ToastType.success,
              title: "Success",
              description: "Bot activated sucessfully",
            })
            storage.set(StorageKey.BOT_RUNNING, "true")
            storage.set(StorageKey.USER_ID, userId)
            storage.set(StorageKey.BOT_KEY, key)
            storage.set(StorageKey.BOT_SECRET, secret)
            setBotRunning(true)
          },
          onError: () =>
            showToast({
              type: ToastType.error,
              title: "Error activating bot",
            }),
        },
      )
    },
  })

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
    storage.set(StorageKey.BOT_ACTIVATED, "true")
    setReadyToActivate(false)
    setBotActivated(true)
    showToast({
      type: ToastType.success,
      title: "Success",
      description: "Bot is activated, check your bybit account.",
    })
  }
  const handleBotStop = async () => {
    stopBot({
      user_id: "5af1ff48-6118-4386-b005-950e1e0aa18e",
      key: "dQNkIqTpl5mx055OK6",
      secret: "1tzjhXH420hhHqPxZtqB9l7VXMWyZ4T1UYDB",
    })
  }

  const viewStyle = {
    backgroundColor: isDarkMode ? colors.black : "#ffff",
    paddingBottom: bottom + space[6],
    marginTop: space[6],
  }

  const profitSummary = {
    last24hours: 1.45,
    last7days: -3.33,
    lastMonth: 6.32,
  }

  // console.log("==Payment Data===", paymentData)
  console.log("===Activate Date===", activateData, isActivateSuccess)
  // console.log("===stop Date===", stopData)

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
          <Typography color="primary.600" size="h3" style={styles.title}>
            {t("home.greetings")}
          </Typography>

          <Typography style={styles.description}>{t("home.description")}</Typography>

          {/* {!isLoggedIn && ( */}
          <View>
            <Typography color="primary.600" size="h3" style={styles.profits}>
              {t("home.profits")}
            </Typography>
            <Typography style={styles.profitDescription}>{t("home.profit-description")}</Typography>
            <ProfitsList profitSummary={profitSummary} />
          </View>
          {/* )} */}
        </View>
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
              {!tradingInitiated && (
                <>
                  <PlansSelector plans={plansToShow as Plan[]} goToPlans={() => null} />
                  <Button onPress={() => goToStartTrading()}>{t("home.startEarn")}</Button>
                </>
              )}
              {paymentProcessing && (
                <>
                  <Spinner />
                  <Typography color="primary.400">
                    Please, when we receive your payment you will be able to activate the bot
                  </Typography>
                </>
              )}
              {readyToActivate && <Button onPress={activateBot}>Activate Bot</Button>}

              {botActivated && (
                <View>
                  <TextInput
                    label={t("profile.apiKeys.form.apiKey.label")}
                    placeholder={t("profile.apiKeys.form.apiKey.placeholder")}
                    {...getTextFieldProps("key")}
                  />

                  <TextInput
                    label={t("profile.apiKeys.form.secretKey.label")}
                    placeholder={t("profile.apiKeys.form.secretKey.placeholder")}
                    {...getTextFieldProps("secret")}
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
                  <Button onPress={() => handleSubmit()}>Save</Button>
                </View>
              )}
              {botRunning && (
                <Button bgColor={"red.500"} onPress={handleBotStop} style={{ marginVertical: 10 }}>
                  Stop Bot
                </Button>
              )}
            </>
          )}
        </View>
      </ScrollView>
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
