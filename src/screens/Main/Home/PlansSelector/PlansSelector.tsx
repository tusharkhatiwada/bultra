import { StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Stack, useTheme, VStack } from "native-base"
import { useTranslation } from "react-i18next"
import { FC } from "react"

import { RootView } from "components/RootView"
import { Typography } from "../../../../components/Typography"
import { PlansSelectorCard } from "./PlansSelectorCard"
import { GetPlans } from "../../../../api/domain/auth"
import { Plan } from "../../../../models/Plans"

interface Props {
  plans: GetPlans.Response
  goToLogin: (selectedPlanId?: Plan) => void
}

export const PlansSelector: FC<Props> = ({ plans, goToLogin }) => {
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation()

  return (
    <RootView style={[styles.container, { paddingBottom: bottom + space[6] }]}>
      <Typography size="headline" weight="bold" style={styles.title}>
        {t("plans.selectPlan.title")}
      </Typography>

      <Typography color="primary.400" style={styles.description}>
        {t("plans.selectPlan.description")}
      </Typography>

      <VStack space="xs">
        <Stack space="xs" direction={"row"}>
          <PlansSelectorCard plan={plans[0]} goToLogin={goToLogin} />
          <PlansSelectorCard plan={plans[1]} goToLogin={goToLogin} />
        </Stack>
        <Stack space="xs" direction={"row"}>
          <PlansSelectorCard plan={plans[2]} goToLogin={goToLogin} />
          <PlansSelectorCard plan={plans[3]} goToLogin={goToLogin} />
        </Stack>
      </VStack>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  title: {
    marginBottom: 10,
    marginTop: -30,
  },

  description: {
    marginBottom: 15,
  },
})
