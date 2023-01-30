import { DeviceEventEmitter, StyleSheet, View } from "react-native"
import { FC, useEffect, useState } from "react"

import { AuthStackScreenProps } from "models/Navigation"
import { Button } from "components/Button"
import { CommonActions } from "@react-navigation/native"
import { Events } from "models/Events"
import { NetworkTypes } from "models/Networks"
import { FreePlanMock, PlanTranslationsTypes } from "models/Plans"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { SelectPlan } from "./SelectPlan"
import { SelectSubscription } from "./SelectSubscription"
import { Stepper } from "components/Stepper"
import { ToastType } from "components/Toast/Toast"
import { usePlanSubscription } from "hooks/auth/usePlanSubscription"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useToastContext } from "context/ToastContext"
import { useTranslation } from "react-i18next"
import { isNil } from "lodash"
import { Header } from "../../../components/Header"
import { useAuthContext } from "../../../context/AuthContext"

const PLAN_STEP = 1
const SUBSCRIPTION_STEP = 2
const TOTAL_STEPS = 2

export type PlansProps = AuthStackScreenProps<typeof Routes.auth.plans>

export const Plans: FC<PlansProps> = ({ navigation, route }) => {
  const routeParams = route.params
  const desiredPlan = !isNil(routeParams) ? routeParams.desiredPlan : FreePlanMock
  const step = !isNil(routeParams) ? routeParams.step : 1
  const [currentStep, setCurrentStep] = useState(step)
  const [planToConfig, setPlanToConfig] = useState(desiredPlan)
  const [selectedNetwork, setSelectedNetwork] = useState(NetworkTypes.BNB_SMART_CHAIN)

  const { isLoggedIn, setSelectedPlan, userV2, setUserV2 } = useAuthContext()

  const onBackPress = () => {
    if (isLoggedIn) {
      setSelectedPlan(null)
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: Routes.main.navigator }] }),
      )
    }
  }

  useEffect(() => {
    if (!isNil(routeParams)) {
      navigation.setOptions({
        header: ({ navigation }) => (
          <Header
            navigation={navigation}
            canGoBack
            title={t(`plans.selectPlan.${PlanTranslationsTypes[routeParams.desiredPlan.name]}`)}
            onBackPress={onBackPress}
          />
        ),
      })
    }
  }, [routeParams])

  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation()

  const { showToast } = useToastContext()

  const { planSubscription, isLoading } = usePlanSubscription()

  const handleButtonPress = () => {
    if (currentStep === TOTAL_STEPS) {
      planSubscription(
        { id: planToConfig.id },
        {
          onSuccess: () => {
            if (!isNil(userV2)) setUserV2({ ...userV2, UserPlan: { Plan: planToConfig } })
            showToast({
              type: ToastType.info,
              title: t("plans.toast.title"),
              description: t("plans.toast.description"),
            })
            navigation.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: Routes.main.navigator }] }),
            )
          },
          onError: (error) => {
            showToast({
              type: ToastType.error,
              title: "Error",
              description: error.message,
            })
            console.error(error)
          },
        },
      )
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBackButtonPress = () => {
    if (currentStep === 1) {
      navigation.goBack()
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  useEffect(() => {
    const event = DeviceEventEmitter.addListener(Events.HeaderBackButtonPress, () => {
      handleBackButtonPress()
    })

    return () => event.remove()
  }, [currentStep])

  return (
    <RootView style={[styles.container, { paddingBottom: bottom + space[6] }]}>
      <View style={styles.padding}>
        <Stepper currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      </View>

      {currentStep === PLAN_STEP && (
        <SelectPlan selectedPlan={planToConfig} setSelectedPlan={setPlanToConfig} />
      )}

      {currentStep === SUBSCRIPTION_STEP && (
        <SelectSubscription
          selectedPlan={planToConfig.name}
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={setSelectedNetwork}
        />
      )}

      <View style={styles.padding}>
        <Button isLoading={isLoading} onPress={handleButtonPress}>
          {currentStep === TOTAL_STEPS ? t("common.finish") : t("common.continue")}
        </Button>
      </View>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  padding: {
    paddingHorizontal: 24,
  },
})
