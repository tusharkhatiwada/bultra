import { Dispatch, FC, SetStateAction } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import { Plan } from "models/Plans"
import { Typography } from "components/Typography"

export type SelectPlanProps = {
  selectedPlan: Plan
  setSelectedPlan: Dispatch<SetStateAction<Plan>>
}

export const SelectPlan: FC<SelectPlanProps> = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.padding}>
        <Typography color="primary.400">
          Welcome to Fast Growing, the most efficient way to profitability and passive income
          through our trading strategies system.
        </Typography>
        <View style={styles.sumBox}>
          <View style={styles.sumContainer}>
            <Typography>Your current plan deposit:</Typography>
            <Typography>€ 36,45</Typography>
          </View>

          <View style={styles.sumContainer}>
            <Typography>Your new plan cost:</Typography>
            <Typography>€ 75,00</Typography>
          </View>
          <View style={styles.sumContainer}>
            <Typography>Your payment amount:</Typography>
            <Typography>€ 38,55</Typography>
          </View>
        </View>

        {/*<Typography color="primary.400" style={styles.description}>*/}
        {/*  {t("plans.selectPlan.description")}*/}
        {/*</Typography>*/}

        {/*<View style={styles.switcherBox}>*/}
        {/*  <View style={styles.iconAndText}>*/}
        {/*    <Icon name={"sync"} color={"#A1A1AA"} style={styles.icon} />*/}
        {/*    <Typography size="body">{t("plans.selectPlan.autoRenewal")}</Typography>*/}
        {/*  </View>*/}
        {/*  <Switch size="sm" colorScheme="primary" />*/}
        {/*</View>*/}

        {/*<Stack space="lg" accessibilityRole="radiogroup">*/}
        {/*  {!isNil(plans) &&*/}
        {/*    plans.map((plan) => (*/}
        {/*      <PlanCard*/}
        {/*        key={plan.id}*/}
        {/*        selected={isSelected(plan.name)}*/}
        {/*        selectPlan={setSelectedPlan}*/}
        {/*        plan={plan}*/}
        {/*      />*/}
        {/*    ))}*/}
        {/*</Stack>*/}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sumBox: {
    marginTop: 20,
  },
  sumContainer: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#E4E4E7",
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  padding: {
    padding: 24,
  },
})
