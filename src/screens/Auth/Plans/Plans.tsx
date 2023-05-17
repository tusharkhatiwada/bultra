import { DeviceEventEmitter, StyleSheet, View } from "react-native"
import { FC, useEffect, useState } from "react"

import { AuthStackScreenProps } from "models/Navigation"
import { Button } from "components/Button"
import { CommonActions } from "@react-navigation/native"
import { Events } from "models/Events"
import { NetworkTypes } from "models/Networks"
import { FreePlanMock } from "models/Plans"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { SelectPlan } from "./SelectPlan"
import { SelectSubscription } from "./SelectSubscription"
import { ToastType } from "components/Toast/Toast"
import { usePlanSubscription } from "hooks/auth/usePlanSubscription"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useToastContext } from "context/ToastContext"
import { useTranslation } from "react-i18next"
import { isNil } from "lodash"
import { Header } from "../../../components/Header"
import { useAuthContext } from "../../../context/AuthContext"
import { useChangePlansNavigationProps } from "../../../hooks/auth/useChangePlansNavigationProps"
import { useGetPriceUpdatePlan } from "../../../hooks/auth/useGetPriceUpdatePlan"

const PLAN_STEP = 1
const SUBSCRIPTION_STEP = 2
const TOTAL_STEPS = 2

export type PlansProps = AuthStackScreenProps<typeof Routes.auth.plans>

export const Plans: FC<PlansProps> = ({ navigation, route }) => {
  const { desiredPlan, step } = route.params
  const defaultPlan = !isNil(desiredPlan) ? desiredPlan : FreePlanMock
  const defaultStep = !isNil(step) ? step : 1
  const [currentStep, setCurrentStep] = useState(defaultStep)
  const [planToConfig, setPlanToConfig] = useState(defaultPlan)
  const [selectedNetwork, setSelectedNetwork] = useState(NetworkTypes.BNB_SMART_CHAIN)
  const { priceUpdatePlan, remove } = useGetPriceUpdatePlan({
    id: !isNil(desiredPlan) ? desiredPlan.id : "",
  })

  useEffect(() => {
    return () => {
      remove()
    }
  }, [])

  const { changeUserPlanLocal } = useAuthContext()
  const { needToChangeNavOptions, onBackPress, headerTitle } = useChangePlansNavigationProps({
    navigation,
    desiredPlan,
    step,
  })

  useEffect(() => {
    if (needToChangeNavOptions) {
      navigation.setOptions({
        header: ({ navigation }) => (
          <Header navigation={navigation} canGoBack title={headerTitle} onBackPress={onBackPress} />
        ),
      })
    }
  }, [needToChangeNavOptions])

  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation()

  const { showToast } = useToastContext()

  const { planSubscription, isLoading } = usePlanSubscription()

  const handleButtonPress = () => {
    planSubscription(
      { id: planToConfig.id },
      {
        onSuccess: () => {
          changeUserPlanLocal(planToConfig)
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
            title: t("plans.toast.error"),
          })
          console.error(error)
        },
      },
    )
  }

  const handleBackButtonPress = () => {
    if (currentStep === 1) {
      navigation.goBack()
    } else {
      setCurrentStep(currentStep - 1)
      navigation.setParams({ step: currentStep - 1 })
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
      <SelectPlan selectedPlan={priceUpdatePlan} />
      <View style={styles.padding}>
        <Button isLoading={isLoading} onPress={handleButtonPress}>
          {t("plans.changePlan")}
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
