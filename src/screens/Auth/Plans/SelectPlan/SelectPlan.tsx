import { FC } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import { Typography } from "components/Typography"
import { GetPriceUpdatePlan } from "../../../../api/domain/auth"
import { isNil } from "lodash"
import { Spinner, useTheme } from "native-base"
import { formatNumberToCurrency } from "../../../../utils/currency"

export type SelectPlanProps = {
  selectedPlan?: GetPriceUpdatePlan.Response
}

export const SelectPlan: FC<SelectPlanProps> = ({ selectedPlan }) => {
  const { colors } = useTheme()
  if (isNil(selectedPlan)) {
    return <Spinner />
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.padding}>
        <Typography color="primary.400">
          Welcome to Bultra Finance, the most efficient way to profitability and passive income
          through our trading strategies system.
        </Typography>
        <View style={styles.sumBox}>
          <View style={styles.sumContainer}>
            <Typography>Your current plan deposit:</Typography>
            <Typography>{`€ ${formatNumberToCurrency(selectedPlan.current)}`}</Typography>
          </View>

          <View style={styles.sumContainer}>
            <Typography>Your new plan cost:</Typography>
            <Typography>{`€ ${formatNumberToCurrency(selectedPlan.new)}`}</Typography>
          </View>
          <View style={styles.sumContainer}>
            <Typography>Your payment amount:</Typography>
            <Typography color={colors.error[400]}>{`€ ${formatNumberToCurrency(
              selectedPlan.amount,
            )}`}</Typography>
          </View>
        </View>
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
