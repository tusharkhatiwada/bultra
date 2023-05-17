import { FC, useEffect, useState } from "react"
import { Spinner, Stack, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"
import { isNil } from "lodash"

import { Button } from "components/Button"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Select } from "components/Select"
import { TextInput } from "components/TextInput"
import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { WalletStackScreenProps } from "models/Navigation"
import { parseFloatWithLocale } from "utils/float"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useToastContext } from "context/ToastContext"
import { useTranslation } from "react-i18next"
import { useWithdrawalRequest } from "hooks/wallet/useWithdrawalRequest"
import { useWithdrawalRequestForm } from "hooks/wallet/useWithdrawalRequestForm"
import { useGetWallet } from "../../../../hooks/wallet/useGetWallet"
import { useIsFocused } from "@react-navigation/native"

export type WithdrawProps = WalletStackScreenProps<typeof Routes.main.wallet.withdraw>

const allowedTokens = ["USDT"]

const MAX_USTD = 20000

export const Withdraw: FC<WithdrawProps> = ({ navigation, route }) => {
  const { t } = useTranslation()
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { showToast } = useToastContext()
  const { addressToSend } = route.params
  const isFocused = useIsFocused()
  const { refetch, walletTrc } = useGetWallet()

  const [tokenBalance, setTokenBalance] = useState<string | null>(null)
  const [infoAmountMessage, setInfoAmountMessage] = useState<
    { text: string; type: "error" | "success" | "info" | "warning" | undefined } | undefined
  >(undefined)

  const { withdrawalRequest, isLoading } = useWithdrawalRequest()

  useEffect(() => {
    if (!isNil(walletTrc)) {
      const usdtBalance = walletTrc.balance.find((token) => token.token === "USDT")
      !isNil(usdtBalance) ? setTokenBalance(usdtBalance.balance) : setTokenBalance("")
    }
  }, [walletTrc])

  useEffect(() => {
    if (!isNil(tokenBalance)) {
      tokenBalance === "0"
        ? setInfoAmountMessage({
            text: `${t("wallet.withdraw.nothingToWithdraw")} ${t("wallet.withdraw.balance")}: 0`,
            type: "error",
          })
        : setInfoAmountMessage({
            text: `${t("wallet.withdraw.balance")}: ${tokenBalance}`,
            type: "info",
          })
    } else {
      setInfoAmountMessage(undefined)
    }
  }, [tokenBalance])

  const handleGoToQrScanner = () => {
    navigation.push("main/wallet/qr_scanner")
    setInfoAmountMessage(undefined)
    // setTokenBalance(null)
    resetForm()
  }

  const { getTextFieldProps, handleSubmit, dirty, isValid, setValue, values, resetForm } =
    useWithdrawalRequestForm({
      onSubmit: ({ amount, walletAddress }) => {
        withdrawalRequest(
          {
            blockchain: !isNil(walletTrc) ? walletTrc.name : "",
            addressTo: walletAddress,
            amount: parseFloatWithLocale(amount),
            token: "USDT",
          },
          {
            onSuccess: () => {
              showToast({
                type: ToastType.success,
                title: "Success",
                description: t("wallet.withdraw.success"),
              })
              refetch()
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

  const goToKYCForm = () => {
    navigation.navigate(Routes.auth.navigator, {
      screen: Routes.auth.kyc,
      params: {
        blockchain: values.network,
        addressTo: values.walletAddress,
        amount: parseFloatWithLocale(values.amount),
        token: "USDT",
      },
    })
  }

  // // TODO: This data should come from an endpoint
  const shouldGoToKYCForm = parseFloatWithLocale(values.amount) >= MAX_USTD

  const isAmountZero = parseFloatWithLocale(values.amount) <= parseFloatWithLocale("0")

  const isAmountMoreThenBalance =
    parseFloatWithLocale(values.amount) > parseFloatWithLocale(tokenBalance || "0")

  const isDisabled =
    !isValid || !dirty || isAmountZero || isAmountMoreThenBalance || shouldGoToKYCForm

  useEffect(() => {
    if (!isNil(addressToSend) && addressToSend !== "" && isFocused) {
      setValue("walletAddress", addressToSend)
    }
  }, [isFocused])

  if (!walletTrc) {
    return (
      <View style={[styles.container, styles.alignCenter]}>
        <Spinner />
      </View>
    )
  }

  const handleSelectNetwork = (value: string) => {
    setValue("network", value)
    setValue("token", "USDT")
    // if (isNil(wallet)) return
    // const selectedWallet = wallet.wallets.find((network) => network.name === value)
    // if (isNil(selectedWallet)) return
    // // const walletTokens = selectedWallet.balance.find((tokenInfo) =>
    // //   allowedTokens.includes(tokenInfo.token),
    // // )
    if (!isNil(walletTrc)) {
      setTokenBalance(walletTrc.balance.toString())
    }
  }

  const handleChangeAmount = (value: string) => {
    const parsedValue = value.replace(",", ".")
    setValue("amount", parsedValue)
    if (parseFloatWithLocale(parsedValue) > parseFloatWithLocale(tokenBalance || "0")) {
      setInfoAmountMessage({
        text: `${t("wallet.withdraw.nothingToWithdraw")} ${t(
          "wallet.withdraw.balance",
        )}: ${tokenBalance}`,
        type: "error",
      })
    } else {
      setInfoAmountMessage({
        text: `${t("wallet.withdraw.balance")}: ${tokenBalance}`,
        type: "info",
      })
    }
  }

  // const networks = wallet.wallets.map((network) => {
  //   return { value: network.name, label: network.name }
  // })

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
        <TextInput
          label={t("wallet.withdraw.walletAddress")}
          {...getTextFieldProps("walletAddress")}
          rightIcon="qrcode"
          onIconPress={handleGoToQrScanner}
        />
        <Typography size="small">{t("wallet.deposit.network")}</Typography>
        <Typography color="primary.400" style={styles.description}>
          {walletTrc ? walletTrc.name : ""}
        </Typography>
        {/*<Select*/}
        {/*  custom*/}
        {/*  placeholder={t("common.select.placeholder", {*/}
        {/*    label: t("wallet.withdraw.network"),*/}
        {/*  })}*/}
        {/*  label={t("wallet.withdraw.network")}*/}
        {/*  bottomLabel={t("wallet.withdraw.selectNetwork")}*/}
        {/*  cta={t("wallet.withdraw.selectNetwork")}*/}
        {/*  options={networks}*/}
        {/*  {...getTextFieldProps("network")}*/}
        {/*  onChange={handleSelectNetwork}*/}
        {/*/>*/}
        <TextInput
          label={t("wallet.withdraw.amount")}
          rightIcon="dollar-sign"
          {...getTextFieldProps("amount")}
          keyboardType="numeric"
          isDisabled={isNil(tokenBalance) || tokenBalance === "0"}
          onChangeText={handleChangeAmount}
          status={infoAmountMessage?.type}
          message={infoAmountMessage?.text}
        />
        <Typography color="primary.400" size="mini" style={styles.description}>
          {t("wallet.withdraw.withdrawWarning")}
        </Typography>
      </KeyboardAwareScrollView>

      <Stack space="lg">
        {shouldGoToKYCForm && (
          <Button variant="outline" onPress={goToKYCForm}>
            {t("wallet.withdraw.goToKYCForm")}
          </Button>
        )}

        <Button isLoading={isLoading} isDisabled={isDisabled} onPress={() => handleSubmit()}>
          {t("wallet.withdraw.cta")}
        </Button>
      </Stack>
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
