import { ScrollView, StyleSheet } from "react-native"
import { HStack } from "native-base"
import React, { FC } from "react"

import { PlansSelectorCard } from "./PlansSelectorCard"
import { GetPlans } from "../../../../api/domain/auth"
import { Plan } from "../../../../models/Plans"

interface Props {
  plans: GetPlans.Response
  goToPlans: (selectedPlanId?: Plan) => void
}

export const PlansSelector: FC<Props> = ({ plans, goToPlans }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <HStack
        space="sm"
        flexDirection="row"
        justifyContent="space-between"
        style={styles.container}
      >
        {plans.map((plan) => {
          return <PlansSelectorCard plan={plan} goToLogin={goToPlans} key={plan.name} />
        })}
      </HStack>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    marginLeft: 9,
  },
})
