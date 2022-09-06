import { Button } from "components/Button"
import { FC } from "react"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"
import { NetworkList } from "models/Networks"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Select } from "components/Select"
import { StyleSheet } from "react-native"
import { TextInput } from "components/TextInput"
import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { WalletStackScreenProps } from "models/Navigation"
import { parseFloatWithLocale } from "utils/float"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useToastContext } from "context/ToastContext"
import { useTranslation } from "react-i18next"
import { useWithdrawalRequest } from "hooks/wallet/useWithdrawalRequest"
import { useWithdrawalRequestForm } from "hooks/wallet/useWithdrawalRequestForm"

export type WithdrawProps = WalletStackScreenProps<typeof Routes.main.wallet.withdraw>

export const Withdraw: FC<WithdrawProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { showToast } = useToastContext()

  const { withdrawalRequest } = useWithdrawalRequest()
  const { getTextFieldProps, handleSubmit, dirty, isValid, setValue } = useWithdrawalRequestForm({
    onSubmit: ({ network, amount, walletAddress }) => {
      withdrawalRequest(
        { network, walletAddress, amount: parseFloatWithLocale(amount) },
        {
          onSuccess: () => {
            showToast({
              type: ToastType.success,
              title: "Success",
              description: t("wallet.withdraw.success"),
            })
            navigation.goBack()
          },
          onError: (err) => {
            showToast({
              type: ToastType.error,
              title: t("wallet.withdraw.error"),
              description: err.message,
            })
          },
        },
      )
    },
  })

  const networks = NetworkList.map((network) => ({ value: network.type, label: network.name }))

  return (
    <RootView
      style={[
        styles.container,
        {
          paddingHorizontal: space[6],
          paddingTop: space[6],
          paddingBottom: bottom + space[6],
        },
      ]}
    >
      <KeyboardAwareScrollView enableOnAndroid>
        <Typography color="primary.400" style={styles.description}>
          {t("wallet.withdraw.description")}
        </Typography>
        <Select
          custom
          placeholder={t("common.select.placeholder", {
            label: t("wallet.withdraw.network"),
          })}
          label={t("wallet.withdraw.network")}
          bottomLabel={t("wallet.withdraw.selectNetwork")}
          cta={t("wallet.withdraw.selectNetwork")}
          options={networks}
          {...getTextFieldProps("network")}
          onChange={(value) => setValue("network", value)}
        />
        <TextInput
          label={t("wallet.withdraw.walletAddress")}
          {...getTextFieldProps("walletAddress")}
        />
        <TextInput
          label={t("wallet.withdraw.amount")}
          rightIcon="dollar-sign"
          {...getTextFieldProps("amount")}
          keyboardType="numeric"
        />
        <Typography color="primary.400" size="mini" style={styles.description}>
          {t("wallet.withdraw.withdrawWarning")}
        </Typography>
      </KeyboardAwareScrollView>
      <Button isDisabled={!isValid || !dirty} onPress={() => handleSubmit()}>
        {t("wallet.withdraw.cta")}
      </Button>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  description: {
    marginBottom: 24,
  },
})
