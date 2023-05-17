import { FC, useState } from "react"
import { Spinner, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"

import { Button } from "components/Button"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { TextInput } from "components/TextInput"
import { Typography } from "components/Typography"
import { InvestStackScreenProps } from "models/Navigation"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import { useInvestRequest } from "../../../../hooks/invest/useInvestRequest"
import { ToastType } from "../../../../components/Toast/Toast"
import { useToastContext } from "../../../../context/ToastContext"
import { parseFloatWithLocale } from "../../../../utils/float"

export type DepositProps = InvestStackScreenProps<typeof Routes.main.invest.deposit>

export const InvestDeposit: FC<DepositProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { investRequest, isLoading } = useInvestRequest()
  const { showToast } = useToastContext()

  const [amount, setAmount] = useState<string>("")

  const handleChangeAmount = (value: string) => {
    const parsedValue = value.replace(",", ".")
    setAmount(parsedValue)
  }

  const goBack = () => {
    investRequest(
      { deposit: parseFloatWithLocale(amount) },
      {
        onSuccess: () => {
          showToast({
            type: ToastType.success,
            title: "Success",
            description: t("invest.investFinished"),
          })
          if (!isLoading) {
            navigation.goBack()
          }
        },
        onError: () =>
          showToast({
            type: ToastType.error,
            title: t("invest.InvestError"),
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
          {t("invest.description")}
        </Typography>
        <TextInput
          label={t("invest.inputTitle")}
          name="amount"
          value={amount}
          keyboardType="numeric"
          rightIcon="dollar-sign"
          onChangeText={handleChangeAmount}
        />
        <Typography size="mini" color="primary.400">
          {t("invest.bottomText")}
        </Typography>
      </KeyboardAwareScrollView>
      <Button onPress={goBack}>{t("invest.finishInvest")}</Button>
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
