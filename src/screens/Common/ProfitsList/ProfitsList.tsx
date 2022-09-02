import { StyleSheet, View } from "react-native"

import { FC } from "react"
import { Icon } from "components/Icon"
import { ProfitSummary } from "models/Wallet"
import { Typography } from "components/Typography"
import { useTheme } from "native-base"
import { useTranslation } from "react-i18next"

export type ProfitsListProps = {
  profitSummary: ProfitSummary
}
export const ProfitsList: FC<ProfitsListProps> = ({ profitSummary }) => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  if (!profitSummary) return null

  return (
    <View style={styles.container}>
      <View style={[styles.profitRow, { borderBottomColor: colors.primary[200] }]}>
        <Typography size="mini" weight="bold">
          {t(`wallet.last24hours`)}
        </Typography>
        <View style={styles.profitValue}>
          <Icon
            color={profitSummary.last24hours >= 0 ? colors.success[400] : colors.error[400]}
            name="chart-line"
          />
          <Typography
            color={profitSummary.last24hours >= 0 ? colors.success[400] : colors.error[400]}
            size="mini"
            weight="bold"
          >
            {profitSummary.last24hours >= 0
              ? `+${profitSummary.last24hours}%`
              : `${profitSummary.last24hours}%`}
          </Typography>
        </View>
      </View>

      <View style={[styles.profitRow, { borderBottomColor: colors.primary[200] }]}>
        <Typography size="mini" weight="bold">
          {t(`wallet.last7days`)}
        </Typography>
        <View style={styles.profitValue}>
          <Icon
            color={profitSummary.last7days >= 0 ? colors.success[400] : colors.error[400]}
            name="chart-line"
          />
          <Typography
            color={profitSummary.last7days >= 0 ? colors.success[400] : colors.error[400]}
            size="mini"
            weight="bold"
          >
            {profitSummary.last7days >= 0
              ? `+${profitSummary.last7days}%`
              : `${profitSummary.last7days}%`}
          </Typography>
        </View>
      </View>

      <View style={[styles.profitRow, { borderBottomColor: colors.primary[200] }]}>
        <Typography size="mini" weight="bold">
          {t(`wallet.lastMonth`)}
        </Typography>
        <View style={styles.profitValue}>
          <Icon
            color={profitSummary.lastMonth >= 0 ? colors.success[400] : colors.error[400]}
            name="chart-line"
          />
          <Typography
            color={profitSummary.lastMonth >= 0 ? colors.success[400] : colors.error[400]}
            size="mini"
            weight="bold"
          >
            {profitSummary.lastMonth >= 0
              ? `+${profitSummary.lastMonth}%`
              : `${profitSummary.lastMonth}%`}
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
