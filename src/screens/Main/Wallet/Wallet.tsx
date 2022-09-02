import { Stack, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"
import { Trans, useTranslation } from "react-i18next"

import { Button } from "components/Button"
import { FC } from "react"
import { ProfitsList } from "screens/Common/ProfitsList"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Typography } from "components/Typography"
import { WalletStackScreenProps } from "models/Navigation"
import { formatNumberToCurrency } from "utils/currency"
import { useGetWallet } from "hooks/wallet/useGetWallet"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export type WalletProps = WalletStackScreenProps<typeof Routes.main.wallet.walletDetails>

export const Wallet: FC<WalletProps> = ({ navigation }) => {
  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()
  const { colors } = useTheme()
  const { wallet } = useGetWallet()

  const { t } = useTranslation()

  const goToDepositScreen = () => {
    navigation.push("main/wallet/deposit")
  }

  const goToWithdrawalScreen = () => {
    navigation.push("main/wallet/withdraw")
  }

  if (!wallet) return null

  return (
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
        color={colors.success[400]}
        style={styles.unit}
      >{`+${wallet.profitSummary.last24hours}% (24h)`}</Typography>

      <Stack space="lg" direction="row" style={styles.buttonContainer}>
        <Button onPress={goToDepositScreen} width="45%">
          {t("wallet.deposit.title")}
        </Button>
        <Button onPress={goToWithdrawalScreen} width="45%" variant="outline">
          {t("wallet.withdraw.title")}
        </Button>
      </Stack>

      <Typography size="h3" style={styles.title}>
        {t("wallet.profits")}
      </Typography>

      <ProfitsList profitSummary={wallet.profitSummary} />
    </RootView>
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
    marginTop: 16,
    marginBottom: 24,
  },
})
