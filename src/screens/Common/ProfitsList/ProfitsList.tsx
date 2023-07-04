import { StyleSheet, View } from "react-native"

import { FC } from "react"
import { Icon } from "components/Icon"
import { ProfitSummary } from "models/Wallet"
import { Typography } from "components/Typography"
import { useTheme } from "native-base"
import { useTranslation } from "react-i18next"
import { useGetPnl } from "hooks/pnl/useGetPnk"

export type ProfitsListProps = {
  profitSummary: ProfitSummary
}
export const ProfitsList: FC<ProfitsListProps> = ({ profitSummary }) => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const { data } = useGetPnl()

  if (!profitSummary) return null

  return (
    <View style={styles.container}>
      <View style={[styles.profitRow, { borderBottomColor: colors.primary[200] }]}>
        <Typography>{t(`wallet.last24hours`)}</Typography>
        <View style={styles.profitValue}>
          <Icon
            color={data?.["24Hours"] >= 0 ? colors.success[400] : colors.error[400]}
            name="chart-line"
          />
          <Typography color={data?.["24Hours"] >= 0 ? colors.success[400] : colors.error[400]}>
            {data?.["24Hours"] >= 0 ? `+${data?.["24Hours"]}%` : `${data?.["24Hours"]}%`}
          </Typography>
        </View>
      </View>

      <View style={[styles.profitRow, { borderBottomColor: colors.primary[200] }]}>
        <Typography>{t(`wallet.last7days`)}</Typography>
        <View style={styles.profitValue}>
          <Icon
            color={data?.lastWeek >= 0 ? colors.success[400] : colors.error[400]}
            name="chart-line"
          />
          <Typography color={data?.lastWeek >= 0 ? colors.success[400] : colors.error[400]}>
            {data?.lastWeek >= 0 ? `+${data?.lastWeek}%` : `${data?.lastWeek}%`}
          </Typography>
        </View>
      </View>

      <View style={[styles.profitRow, { borderBottomColor: colors.primary[200] }]}>
        <Typography>{t(`wallet.lastMonth`)}</Typography>
        <View style={styles.profitValue}>
          <Icon
            color={data?.lastMonth >= 0 ? colors.success[400] : colors.error[400]}
            name="chart-line"
          />
          <Typography color={data?.lastMonth >= 0 ? colors.success[400] : colors.error[400]}>
            {data?.lastMonth >= 0 ? `+${data?.lastMonth}%` : `${data?.lastMonth}%`}
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
