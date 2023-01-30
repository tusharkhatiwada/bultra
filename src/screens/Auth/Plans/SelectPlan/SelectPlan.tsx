import { Dispatch, FC, SetStateAction } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import { PlanCard } from "./PlanCard"
import { Plan, PlanTypes } from "models/Plans"
import { Stack } from "native-base"
import { Typography } from "components/Typography"
import { useTranslation } from "react-i18next"
import { useGetAllPlans } from "../../../../hooks/auth/useGetAllPlans"
import { isNil } from "lodash"

export type SelectPlanProps = {
  selectedPlan: Plan
  setSelectedPlan: Dispatch<SetStateAction<Plan>>
}

export const SelectPlan: FC<SelectPlanProps> = ({ selectedPlan, setSelectedPlan }) => {
  const { t } = useTranslation()

  const { plans } = useGetAllPlans()

  const isSelected = (plan: PlanTypes) => selectedPlan.name === plan

  return (
    <ScrollView style={styles.container}>
      <View style={styles.padding}>
        <Typography size="headline" weight="bold" style={styles.title}>
          {t("plans.selectPlan.title")}
        </Typography>

        <Typography color="primary.400" style={styles.description}>
          {t("plans.selectPlan.description")}
        </Typography>

        <Stack space="lg" accessibilityRole="radiogroup">
          {!isNil(plans) &&
            plans.map((plan) => (
              <PlanCard
                key={plan.id}
                selected={isSelected(plan.name)}
                selectPlan={setSelectedPlan}
                plan={plan}
              />
            ))}
        </Stack>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 24,
  },
  padding: {
    padding: 24,
  },
})
