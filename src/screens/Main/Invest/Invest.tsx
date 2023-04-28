import { dateFilterButtons } from "components/ButtonBar/constants/DateFilterButtons"
import { FC, useState } from "react"
import { ScrollView, Spinner, Stack, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"
import { Trans, useTranslation } from "react-i18next"

import { Button } from "components/Button"
import { ButtonBar } from "components/ButtonBar"
import { Icon } from "components/Icon"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Typography } from "components/Typography"
import { InvestHistoryList } from "./InvestHistoryList"
import { InvestStackScreenProps } from "models/Navigation"
import { formatNumberToCurrency } from "utils/currency"
import { useFetchWalletHistory } from "hooks/wallet/useFetchWalletHistory"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { TransactionRange, WalletHistory } from "../../../models/Wallet"
import { useAuthContext } from "../../../context/AuthContext"
import { useGetDataInvest } from "../../../hooks/invest/useGetDataInvest"
import { InvestProfitsList } from "./InvestProfitsList/InvestProfitsList"
import { isNil } from "lodash"
import { InvestOpenPosition } from "./InvestOpenPosition/InvestOpenPosition"

export type InvestProps = InvestStackScreenProps<typeof Routes.main.invest.walletDetails>

export const Invest: FC<InvestProps> = ({ navigation }) => {
  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()
  const { colors } = useTheme()
  const { investData } = useGetDataInvest()
  const { user } = useAuthContext()
  // const isFocused = useIsFocused()
  const [historyDateRange, setHistoryDateRange] = useState<TransactionRange>("month")
  const [isWalletLoading, setIsWalletLoading] = useState(false)

  const [walletHistory, setWalletHistory] = useState<WalletHistory[] | undefined>(undefined)

  const { getWalletHistory } = useFetchWalletHistory(historyDateRange)

  const { t } = useTranslation()

  if (!investData || !user) {
    return (
      <View style={[styles.container, styles.alignCenter]}>
        <Spinner />
      </View>
    )
  }

  const goToDepositScreen = () => {
    navigation.push("main/invest/deposit")
  }

  const goToWithdrawalScreen = () => {
    navigation.navigate(Routes.main.invest.refund, { addressToSend: "" })
  }

  // useEffect(() => {
  //   if (isFocused) {
  //     onDateRangeChange("month")
  //   }
  // }, [isFocused])

  const handleGetWalletHistory = (value: TransactionRange) => {
    getWalletHistory(value, {
      onSuccess: (response) => {
        setWalletHistory(response)
        setIsWalletLoading(false)
      },
    })
  }

  const onDateRangeChange = (value: TransactionRange) => {
    setIsWalletLoading(true)
    handleGetWalletHistory(value)
    setHistoryDateRange(value)
  }

  const hasPositivePercentage = !isNil(investData) ? investData.profits.last24h.percent >= 0 : false

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
          {t("invest.title")}
        </Typography>

        <Typography color={colors.primary[400]} style={styles.title}>
          {t("wallet.total-balance")}
        </Typography>
        <View style={styles.balance}>
          <Typography size="h1" weight="bold">
            <Trans
              i18nKey={`common.USDT`}
              values={{
                value: formatNumberToCurrency(investData.userDeposit),
              }}
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
          {!isNil(investData) &&
            `${hasPositivePercentage ? "+" : ""}$${formatNumberToCurrency(
              investData.profits.last24h.amount,
            )} (${investData.profits.last24h.percent}% ${t("wallet.last24hours").toLowerCase()})`}
        </Typography>
        <Stack space="lg" direction="row" style={styles.buttonContainer}>
          <Button
            onPress={goToDepositScreen}
            leftIcon={<Icon name="arrow-down" size="md" />}
            style={styles.button}
          >
            {t("invest.invest")}
          </Button>
          <Button
            onPress={goToWithdrawalScreen}
            variant="outline"
            leftIcon={<Icon name="arrow-up" size="md" />}
            style={styles.button}
          >
            {t("invest.refund")}
          </Button>
        </Stack>
        <Typography size="h3" style={styles.subTitle}>
          {t("wallet.profits")}
        </Typography>
        <InvestProfitsList profitSummary={investData.profits} />
        <Typography size="h3" style={styles.subTitle}>
          {t("invest.openPosition")}
        </Typography>
        <InvestOpenPosition investData={investData} />
        <Typography size="h3" style={styles.subTitle}>
          {t("wallet.history.title")}
        </Typography>
        <ButtonBar
          onChange={onDateRangeChange}
          buttons={dateFilterButtons}
          defaultValue={"month"}
        />
        <InvestHistoryList walletHistory={walletHistory} isLoading={isWalletLoading} />
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
  subTitle: {
    marginBottom: 16,
    marginTop: 24,
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
