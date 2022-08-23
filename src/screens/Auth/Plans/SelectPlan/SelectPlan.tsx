import { Dispatch, FC, SetStateAction } from "react"
import { StyleSheet, View } from "react-native"

import { PlanCard } from "./PlanCard"
import { PlanTypes } from "models/Plans"
import { Stack } from "native-base"
import { Typography } from "components/Typography"
import { useTranslation } from "react-i18next"

export type SelectPlanProps = {
  selectedPlan: PlanTypes
  setSelectedPlan: Dispatch<SetStateAction<PlanTypes>>
}

export const SelectPlan: FC<SelectPlanProps> = ({ selectedPlan, setSelectedPlan }) => {
  const { t } = useTranslation()

  const isSelected = (plan: PlanTypes) => selectedPlan === plan

  return (
    <View style={styles.container}>
      <Typography size="headline" weight="bold" style={styles.title}>
        {t("plans.selectPlan.title")}
      </Typography>

      <Typography color="primary.400" style={styles.description}>
        {t("plans.selectPlan.description")}
      </Typography>

      <Stack space="lg" accessibilityRole="radiogroup">
        <PlanCard
          type={PlanTypes.BASIC}
          selected={isSelected(PlanTypes.BASIC)}
          selectPlan={setSelectedPlan}
        />

        <PlanCard
          type={PlanTypes.PREMIUM}
          selected={isSelected(PlanTypes.PREMIUM)}
          selectPlan={setSelectedPlan}
        />

        <PlanCard
          type={PlanTypes.VIP}
          selected={isSelected(PlanTypes.VIP)}
          selectPlan={setSelectedPlan}
        />
      </Stack>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 24,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 24,
  },
})
