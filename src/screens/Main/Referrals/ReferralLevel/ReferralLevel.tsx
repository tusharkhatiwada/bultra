import { StyleSheet, View } from "react-native"

import { FC } from "react"
import { Icon } from "components/Icon"
import { ReferralLevel as ReferralLevelType } from "models/Referrals"
import { Trans } from "react-i18next"
import { Typography } from "components/Typography"
import { accentColors } from "styles/colors"
import { formatNumberToCurrency } from "utils/currency"
import { useTheme } from "native-base"

export type ReferralLevelProps = {
  level: ReferralLevelType
}

export const ReferralLevel: FC<ReferralLevelProps> = ({ level }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { borderColor: colors.primary[200] }]}>
      <View style={styles.level}>
        <Typography size="mini" weight="semibold" numberOfLines={1}>
          <Trans i18nKey="referrals.level" values={{ number: level.level }} />
        </Typography>
      </View>

      <View style={styles.referrals}>
        <Typography>{formatNumberToCurrency(level.referrals)}</Typography>
        <Icon name="user-friends" size="md" color="primary.400" style={styles.icon} />
      </View>

      <View style={styles.amount}>
        <Typography>{formatNumberToCurrency(level.amount)}</Typography>
        <Icon name="dollar-sign" size="md" color="primary.400" style={styles.icon} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
  },
  level: {
    width: 66,
    backgroundColor: accentColors.gold,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    borderRadius: 4,
  },
  referrals: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  icon: {
    marginLeft: 4,
  },
  amount: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
})
