import { DeviceEventEmitter, StyleSheet } from "react-native"
import { FC, useEffect, useState } from "react"

import { AuthStackScreenProps } from "models/Navigation"
import { Button } from "components/Button"
import { CommonActions } from "@react-navigation/native"
import { Events } from "models/Events"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { SelectPlan } from "./SelectPlan"
import { SelectSubscription } from "./SelectSubscription"
import { Stepper } from "components/Stepper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useTranslation } from "react-i18next"

const PLAN_STEP = 1
const SUBSCRIPTION_STEP = 2
const TOTAL_STEPS = 2

export type PlansProps = AuthStackScreenProps<typeof Routes.auth.plans>

export const Plans: FC<PlansProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1)

  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation()

  const handleButtonPress = () => {
    if (currentStep === TOTAL_STEPS) {
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: Routes.main.navigator }] }),
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
    <RootView
      style={[
        styles.container,
        {
          paddingHorizontal: space[6],
          paddingBottom: bottom + space[6],
        },
      ]}
    >
      <Stepper currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {currentStep === PLAN_STEP && <SelectPlan />}
      {currentStep === SUBSCRIPTION_STEP && <SelectSubscription />}

      <Button onPress={handleButtonPress}>
        {currentStep === TOTAL_STEPS ? t("common.finish") : t("common.continue")}
      </Button>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
})
