import { StyleSheet, View } from "react-native"

import { FC } from "react"
import { Icon } from "components/Icon"
import { TranslationKeys } from "models/TranslationKeys"
import { Typography } from "components/Typography"
import { WalletHistory } from "models/Wallet"
import { formatNumberToCurrency } from "utils/currency"
import { useTheme } from "native-base"
import { useTranslation } from "react-i18next"

export type WalletHistoryListProps = {
  walletHistory: WalletHistory[]
}

export const WalletHistoryList: FC<WalletHistoryListProps> = ({ walletHistory }) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const WalletTransactionTypes = {
    DEPOSIT: {
      translationKey: "wallet.history.deposit",
      color: colors.info[400],
      sign: "-",
      icon: "arrow-circle-dowm",
    },
    WITHDRAWAL: {
      translationKey: "wallet.history.withdrawal",
      color: colors.warning[400],
      sign: "+",
      icon: "arrow-circle-dowm",
    },
  }

  return (
    <View style={styles.container}>
      {walletHistory.map((transaction, index) => {
        const transactionProps = WalletTransactionTypes[transaction.type]

        return (
          <View
            key={`${transaction.date}-${index}`}
            style={[styles.profitRow, { borderBottomColor: colors.primary[200] }]}
          >
            <View style={styles.profitValue}>
              <View
                style={[
                  styles.circleIcon,
                  {
                    backgroundColor:
                      transaction.type === "DEPOSIT" ? colors.info[400] : colors.warning[400],
                  },
                ]}
              >
                <Icon
                  size="xl"
                  name={transaction.type === "DEPOSIT" ? "arrow-circle-down" : "arrow-circle-up"}
                  color="white"
                />
              </View>
              <View>
                <Typography>{t(transactionProps.translationKey as TranslationKeys)}</Typography>
                <Typography color={colors.primary[400]}>
                  {transaction.date.toLocaleDateString()}
                </Typography>
              </View>
            </View>
            <View style={styles.profitValue}>
              <Typography>{formatNumberToCurrency(transaction.balance)}</Typography>
              <Icon color={colors.primary[400]} name="dollar-sign" />
            </View>
          </View>
        )
      })}
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
  circleIcon: {
    padding: 8,
    borderRadius: 50,
    marginRight: 16,
  },
})
