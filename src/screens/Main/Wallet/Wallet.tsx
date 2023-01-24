import { dateFilterButtons } from "components/ButtonBar/constants/DateFilterButtons"
import { FC, useEffect, useState } from "react"
import { ScrollView, Spinner, Stack, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"
import { Trans, useTranslation } from "react-i18next"

import { Button } from "components/Button"
import { ButtonBar } from "components/ButtonBar"
import { Icon } from "components/Icon"
import { ProfitsList } from "screens/Common/ProfitsList"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Typography } from "components/Typography"
import { WalletHistoryList } from "./WalletHistoryList"
import { WalletStackScreenProps } from "models/Navigation"
import { formatNumberToCurrency } from "utils/currency"
import { useFetchWalletHistory } from "hooks/wallet/useFetchWalletHistory"
import { useGetWallet } from "hooks/wallet/useGetWallet"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { TransactionRange, WalletHistory } from "../../../models/Wallet"

export type WalletProps = WalletStackScreenProps<typeof Routes.main.wallet.walletDetails>

export const Wallet: FC<WalletProps> = ({ navigation }) => {
  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()
  const { colors } = useTheme()
  const { wallet } = useGetWallet()
  const [historyDateRange, setHistoryDateRange] = useState<TransactionRange>("month")

  const [walletHistory, setWalletHistory] = useState<WalletHistory[] | undefined>(undefined)

  const { getWalletHistory, isLoading } = useFetchWalletHistory(historyDateRange)

  const { t } = useTranslation()

  const goToDepositScreen = () => {
    navigation.push("main/wallet/deposit")
  }

  const goToWithdrawalScreen = () => {
    navigation.navigate(Routes.main.wallet.withdraw, {})
  }

  useEffect(() => {
    onDateRangeChange("month")
  }, [])

  const onDateRangeChange = (value: TransactionRange) => {
    getWalletHistory(value, {
      onSuccess: (response) => {
        setWalletHistory(response)
      },
    })
    setHistoryDateRange(value)
  }

  if (!wallet || !walletHistory) {
    return (
      <View style={[styles.container, styles.alignCenter]}>
        <Spinner />
      </View>
    )
  }

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
          defaultValue={"month"}
        />

        <WalletHistoryList walletHistory={walletHistory} isLoading={isLoading} />
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
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
})
