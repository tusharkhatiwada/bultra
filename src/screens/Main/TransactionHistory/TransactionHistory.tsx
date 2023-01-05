import { Spinner, useTheme } from "native-base"
import { StyleSheet, View, ScrollView } from "react-native"
import { FC, useState } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"

import { MainTabScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Typography } from "components/Typography"
import { ButtonBar } from "../../../components/ButtonBar"
import {
  dateFilterButtons,
  DateFilterToDateRange,
  DateFilterValue,
} from "../../../components/ButtonBar/constants/DateFilterButtons"
import { WalletHistoryList } from "../Wallet/WalletHistoryList"
import { DateRange } from "../../../models/Date"
import { getThisMonthRange } from "../../../utils/date"
import { useFetchWalletHistory } from "../../../hooks/wallet/useFetchWalletHistory"

export type TransactionHistoryProps = MainTabScreenProps<typeof Routes.main.transactionHistory>

export const TransactionHistory: FC<TransactionHistoryProps> = () => {
  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()
  const { t } = useTranslation()
  const [historyDateRange, setHistoryDateRange] = useState<DateRange>(getThisMonthRange())

  const { walletHistory } = useFetchWalletHistory(historyDateRange)

  const onDateRangeChange = (value: string) => {
    const result = DateFilterToDateRange[value as DateFilterValue]
    setHistoryDateRange(result)
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
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
})
