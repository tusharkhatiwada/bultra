import { Dispatch, FC, SetStateAction } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import { PlanCard } from "./PlanCard"
import { Plan, PlanTypes } from "models/Plans"
import { Stack, Switch } from "native-base"
import { Typography } from "components/Typography"
import { useTranslation } from "react-i18next"
import { useGetAllPlans } from "../../../../hooks/auth/useGetAllPlans"
import { isNil } from "lodash"
import { Icon } from "../../../../components/Icon"

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

        <View style={styles.switcherBox}>
          <View style={styles.iconAndText}>
            <Icon name={"sync"} color={"#A1A1AA"} style={styles.icon} />
            <Typography size="body">{t("plans.selectPlan.autoRenewal")}</Typography>
          </View>
          <Switch size="sm" colorScheme="primary" />
        </View>

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
  switcherBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 39,
    marginTop: 14,
  },
  iconAndText: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 12,
  },
  description: {
    marginBottom: 24,
  },
  padding: {
    padding: 24,
  },
})
