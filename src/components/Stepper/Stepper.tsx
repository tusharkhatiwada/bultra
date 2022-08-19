import { StyleSheet, View } from "react-native"

import { FC } from "react"
import { useTheme } from "native-base"

type StepperProps = {
  currentStep: number
  totalSteps: number
}

export const Stepper: FC<StepperProps> = ({ currentStep, totalSteps }) => {
  const steps = Array(totalSteps).fill("")
  const isActive = (index: number) => index <= currentStep - 1

  const { colors } = useTheme()

  return (
    <View style={styles.stepper}>
      {steps.map((_, index) => (
        <View
          key={`step-${index.toString()}`}
          style={[styles.step, isActive(index) && { backgroundColor: colors.darkBlue[600] }]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  stepper: {
    flexDirection: "row",
    marginHorizontal: -8,
  },
  step: {
    flexGrow: 1,
    marginHorizontal: 8,
    borderRadius: 4,
    height: 6,
  },
})
