import { FC, useState } from "react"
import { Spinner, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"

import { Button } from "components/Button"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { TextInput } from "components/TextInput"
import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { InvestStackScreenProps } from "models/Navigation"
import { parseFloatWithLocale } from "utils/float"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useToastContext } from "context/ToastContext"
import { useTranslation } from "react-i18next"
import { useRefundRequest } from "../../../../hooks/invest/useRefundRequest"

export type WithdrawProps = InvestStackScreenProps<typeof Routes.main.invest.refund>

export const Refund: FC<WithdrawProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { refundRequest, isLoading } = useRefundRequest()
  const { showToast } = useToastContext()

  const [amount, setAmount] = useState<string>("")

  const handleChangeAmount = (value: string) => {
    const parsedValue = value.replace(",", ".")
    setAmount(parsedValue)
  }

  const goBack = () => {
    refundRequest(
      { deposit: parseFloatWithLocale(amount) },
      {
        onSuccess: () => {
          showToast({
            type: ToastType.success,
            title: "Success",
            description: t("invest.refundFinished"),
          })
          if (!isLoading) {
            navigation.goBack()
          }
        },
        onError: () =>
          showToast({
            type: ToastType.error,
            title: t("invest.refundError"),
          }),
      },
    )
  }

  if (isLoading) {
    return (
      <View style={[styles.container, styles.alignCenter]}>
        <Spinner />
      </View>
    )
  }

  return (
    <RootView
      style={[
        styles.container,
        {
          paddingHorizontal: space[6],
          paddingTop: space[6],
          paddingBottom: bottom + space[1],
        },
      ]}
    >
      <KeyboardAwareScrollView enableOnAndroid>
        <Typography color="primary.400" style={styles.description}>
          {t("invest.refundInformation")}
        </Typography>
        <TextInput
          label={t("invest.refundInputTitle")}
          name="amount"
          value={amount}
          keyboardType="numeric"
          rightIcon="dollar-sign"
          onChangeText={handleChangeAmount}
        />
        <Typography size="mini" color="primary.400">
          {t("invest.refundBottomText")}
        </Typography>
      </KeyboardAwareScrollView>
      <Button onPress={goBack}>{t("invest.finishRefund")}</Button>
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
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
})
