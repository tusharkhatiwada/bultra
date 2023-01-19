import { Spinner, useTheme } from "native-base"
import { StyleSheet, View, ScrollView } from "react-native"
import { FC, useEffect, useState } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"

import { MainTabScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Typography } from "components/Typography"
import { ButtonBar } from "../../../components/ButtonBar"
import {
  dateFilterButtons,
} from "../../../components/ButtonBar/constants/DateFilterButtons"
import { WalletHistoryList } from "../Wallet/WalletHistoryList"
import { useFetchWalletHistory } from "../../../hooks/wallet/useFetchWalletHistory"
import { TransactionRange, WalletHistory } from "../../../models/Wallet"

export type TransactionHistoryProps = MainTabScreenProps<typeof Routes.main.transactionHistory>

export const TransactionHistory: FC<TransactionHistoryProps> = () => {
  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()
  const { t } = useTranslation()
  const [historyDateRange, setHistoryDateRange] = useState<TransactionRange>("month")
  const [walletHistory, setWalletHistory] = useState<WalletHistory[] | undefined>(undefined)
  const { getWalletHistory, isLoading } = useFetchWalletHistory(historyDateRange)

  useEffect(() => {
    onDateRangeChange('month')
  }, [])

  const onDateRangeChange = (value: TransactionRange) => {
    getWalletHistory(value, {
        onSuccess: (response) => {
          setWalletHistory(response)
        },
      },
    )
    setHistoryDateRange(value)
  }

  if (!walletHistory) {
    return (
      <View style={[styles.container, styles.alignCenter]}>
        <Spinner />
      </View>
    )
  }

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
        {t("wallet.history.title")}
      </Typography>
      <ButtonBar
        onChange={onDateRangeChange}
        buttons={dateFilterButtons}
        defaultValue={"month"}
      />

      <WalletHistoryList walletHistory={walletHistory} isLoading={isLoading}/>
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
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
})
