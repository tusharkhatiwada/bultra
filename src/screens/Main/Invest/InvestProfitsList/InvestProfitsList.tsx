import { StyleSheet, View } from "react-native"

import { FC } from "react"
import { Icon } from "components/Icon"
import { Typography } from "components/Typography"
import { useTheme } from "native-base"
import { useTranslation } from "react-i18next"
import { InvestProfitSummary } from "../../../../models/Invest"

export type ProfitsListProps = {
  profitSummary: InvestProfitSummary
}
export const InvestProfitsList: FC<ProfitsListProps> = ({ profitSummary }) => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  if (!profitSummary) return null

  return (
    <View style={styles.container}>
      <View style={[styles.profitRow, { borderBottomColor: colors.primary[200] }]}>
        <Typography>{t(`wallet.last24hours`)}</Typography>
        <View style={styles.profitValue}>
          <Icon
            color={profitSummary.last24h.percent >= 0 ? colors.success[400] : colors.error[400]}
            name="chart-line"
          />
          <Typography
            color={profitSummary.last24h.percent >= 0 ? colors.success[400] : colors.error[400]}
          >
            {profitSummary.last24h.percent >= 0
              ? `+${profitSummary.last24h.percent}%`
              : `${profitSummary.last24h.percent}%`}
          </Typography>
        </View>
      </View>

      <View style={[styles.profitRow, { borderBottomColor: colors.primary[200] }]}>
        <Typography>{t(`wallet.last7days`)}</Typography>
        <View style={styles.profitValue}>
          <Icon
            color={profitSummary.last7d.percent >= 0 ? colors.success[400] : colors.error[400]}
            name="chart-line"
          />
          <Typography
            color={profitSummary.last7d.percent >= 0 ? colors.success[400] : colors.error[400]}
          >
            {profitSummary.last7d.percent >= 0
              ? `+${profitSummary.last7d.percent}%`
              : `${profitSummary.last7d.percent}%`}
          </Typography>
        </View>
      </View>

      <View style={[styles.profitRow, { borderBottomColor: colors.primary[200] }]}>
        <Typography>{t(`wallet.lastMonth`)}</Typography>
        <View style={styles.profitValue}>
          <Icon
            color={profitSummary.lastM.percent >= 0 ? colors.success[400] : colors.error[400]}
            name="chart-line"
          />
          <Typography
            color={profitSummary.lastM.percent >= 0 ? colors.success[400] : colors.error[400]}
          >
            {profitSummary.lastM.percent >= 0
              ? `+${profitSummary.lastM.percent}%`
              : `${profitSummary.lastM.percent}%`}
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
