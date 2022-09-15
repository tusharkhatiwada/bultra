import {
  DateFilterToDateRange,
  DateFilterValue,
  dateFilterButtons,
} from "components/ButtonBar/constants/DateFilterButtons"
import { FC, useState } from "react"
import { ScrollView, Stack, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"
import { Trans, useTranslation } from "react-i18next"

import { Button } from "components/Button"
import { ButtonBar } from "components/ButtonBar"
import { DateRange } from "models/Date"
import { Icon } from "components/Icon"
import { ProfitsList } from "screens/Common/ProfitsList"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Typography } from "components/Typography"
import { WalletHistoryList } from "./WalletHistoryList"
import { WalletStackScreenProps } from "models/Navigation"
import { formatNumberToCurrency } from "utils/currency"
import { getThisMonthRange } from "utils/date"
import { useFetchWalletHistory } from "hooks/wallet/useFetchWalletHistory"
import { useGetWallet } from "hooks/wallet/useGetWallet"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export type WalletProps = WalletStackScreenProps<typeof Routes.main.wallet.walletDetails>

export const Wallet: FC<WalletProps> = ({ navigation }) => {
  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()
  const { colors } = useTheme()
  const { wallet } = useGetWallet()
  const [historyDateRange, setHistoryDateRange] = useState<DateRange>(getThisMonthRange())

  const { walletHistory } = useFetchWalletHistory(historyDateRange)

  const { t } = useTranslation()

  const goToDepositScreen = () => {
    navigation.push("main/wallet/deposit")
  }

  const goToWithdrawalScreen = () => {
    navigation.push("main/wallet/withdraw")
  }

  const onDateRangeChange = (value: string) => {
    const result = DateFilterToDateRange[value as DateFilterValue]
    setHistoryDateRange(result)
  }

  if (!wallet || !walletHistory) return null

  const hasPositivePercentage = wallet.profitSummary.last24hours >= 0

  return (
    <ScrollView>
      <RootView
        style={[
          styles.container,
          {
            paddingHorizontal: space[6],
            paddingTop: top + space[6],
            paddingBottom: bottom + space[6],
          },
        ]}
      >
        <Typography size="h3" style={styles.title}>
          {t("wallet.title")}
        </Typography>

        <Typography color={colors.primary[400]} style={styles.title}>
          {t("wallet.total-balance")}
        </Typography>

        <View style={styles.balance}>
          <Typography size="h1" weight="bold">
            <Trans
              i18nKey={`common.USDT`}
              values={{ value: formatNumberToCurrency(wallet.balance) }}
              components={{
                small: <Typography style={styles.unit} />,
              }}
            />
          </Typography>
        </View>

        <Typography
          color={hasPositivePercentage ? colors.success[400] : colors.error[400]}
          style={styles.balanceProfit}
        >
          {`${hasPositivePercentage ? "+" : ""}${wallet.profitSummary.last24hours}% ${t(
            "wallet.last24hours",
          ).toLowerCase()}`}
        </Typography>

        <Stack space="lg" direction="row" style={styles.buttonContainer}>
          <Button
            onPress={goToDepositScreen}
            leftIcon={<Icon name="arrow-down" size="md" />}
            style={styles.button}
          >
            {t("wallet.deposit.title")}
          </Button>
          <Button
            onPress={goToWithdrawalScreen}
            variant="outline"
            leftIcon={<Icon name="arrow-up" size="md" />}
            style={styles.button}
          >
            {t("wallet.withdraw.title")}
          </Button>
        </Stack>

        <Typography size="h3" style={styles.title}>
          {t("wallet.profits")}
        </Typography>

        <ProfitsList profitSummary={wallet.profitSummary} />

        <Typography size="h3" style={styles.title}>
          {t("wallet.history.title")}
        </Typography>

        <ButtonBar
          onChange={onDateRangeChange}
          buttons={dateFilterButtons}
          defaultValue={"THIS_MONTH"}
        />

        <WalletHistoryList walletHistory={walletHistory} />
      </RootView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 16,
  },
  balance: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  unit: {
    marginBottom: 8,
    lineHeight: 60,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 24,
  },
  button: {
    flex: 1,
  },
  balanceProfit: {
    marginBottom: 8,
  },
})
