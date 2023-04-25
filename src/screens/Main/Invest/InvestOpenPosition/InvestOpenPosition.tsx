import { StyleSheet, View } from "react-native"

import { FC } from "react"
import { Typography } from "components/Typography"
import { useTheme } from "native-base"
import { GetDataInvest } from "../../../../api/domain/invest"

export type Props = {
  investData: GetDataInvest.Response
}
export const InvestOpenPosition: FC<Props> = ({ investData }) => {
  const { colors } = useTheme()

  if (!investData) return null

  return (
    <View style={styles.container}>
      <View style={[styles.profitRow, { borderBottomColor: colors.primary[200] }]}>
        <Typography>BTCUSDT</Typography>
        <View style={styles.profitValue}>
          <Typography
            color={
              investData.positions[0].BTCUSDT[1] >= 0 ? colors.success[400] : colors.error[400]
            }
          >
            {investData.positions[0].BTCUSDT[0]}
          </Typography>
        </View>
      </View>

      <View style={[styles.profitRow, { borderBottomColor: colors.primary[200] }]}>
        <Typography>ETHUSDT</Typography>
        <View style={styles.profitValue}>
          <Typography
            color={
              investData.positions[1].ETHUSDT[1] >= 0 ? colors.success[400] : colors.error[400]
            }
          >
            {investData.positions[1].ETHUSDT[0]}
          </Typography>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  profitValue: {
    flexDirection: "row",
    alignItems: "center",
  },
})
