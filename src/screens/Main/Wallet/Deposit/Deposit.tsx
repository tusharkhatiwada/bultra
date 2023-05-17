import * as Clipboard from "expo-clipboard"

import { FC, useEffect, useState } from "react"
import { Spinner, useTheme } from "native-base"
import { Pressable, StyleSheet, View } from "react-native"
import { isNil } from "lodash"

import { Button } from "components/Button"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Select } from "components/Select"
import { TextInput } from "components/TextInput"
import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { WalletStackScreenProps } from "models/Navigation"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useToastContext } from "context/ToastContext"
import { useTranslation } from "react-i18next"
import { useGetWallet } from "../../../../hooks/wallet/useGetWallet"
import { WalletsType } from "../../../../models/Wallet"
import { QrCode } from "../../../../components/QrCode"
import { Icon } from "../../../../components/Icon"

export type DepositProps = WalletStackScreenProps<typeof Routes.main.wallet.deposit>

export const Deposit: FC<DepositProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { showToast } = useToastContext()
  const { wallet, walletTrc } = useGetWallet()

  const [selectedNetwork, setSelectedNetwork] = useState<WalletsType>()

  const copyToClipboard = async (value?: string) => {
    if (isNil(value)) return
    await Clipboard.setStringAsync(value).then(() => {
      showToast({
        type: ToastType.info,
        title: value,
        description: t("plans.selectSubscription.deposit.copy-info"),
      })
    })
  }

  const goBack = () => {
    navigation.goBack()
  }

  if (!walletTrc) {
    return (
      <View style={[styles.container, styles.alignCenter]}>
        <Spinner />
      </View>
    )
  }
  // useEffect(() => {
  //   if (!isNil(wallet)) {
  //     const trc20 = wallet.wallets.find((network) => network.name === "TRC20")
  //     setSelectedNetwork(trc20)
  //   }
  // }, [wallet])

  const handleSelectNetwork = (value: string) => {
    const network = wallet?.wallets.find((network) => network.id === value)
    if (!isNil(network)) {
      setSelectedNetwork(network)
    }
  }

  const networks = wallet?.wallets.map((network) => ({ value: network.id, label: network.name }))

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
      <View>
        <Typography color="primary.400" style={styles.description}>
          {t("wallet.deposit.description")}
        </Typography>
        <Typography color="primary.400" style={styles.description}>
          {t("wallet.deposit.description")}
        </Typography>
        <Typography size="small">{t("wallet.deposit.network")}</Typography>
        <Typography color="primary.400" style={styles.description}>
          {walletTrc ? walletTrc.name : ""}
        </Typography>
        <Typography size="small">{t("wallet.deposit.walletAddress")}</Typography>
        <View style={styles.networkAddressContainer}>
          <Typography color="primary.400">{walletTrc ? walletTrc.address : ""}</Typography>
          <Pressable onPress={() => copyToClipboard(walletTrc?.address)}>
            <Icon name="copy" size="lg" />
          </Pressable>
        </View>
        {/*<Select*/}
        {/*  custom*/}
        {/*  placeholder={t("common.select.placeholder", {*/}
        {/*    label: t("wallet.deposit.network"),*/}
        {/*  })}*/}
        {/*  label={t("wallet.deposit.network")}*/}
        {/*  bottomLabel={t("wallet.deposit.selectNetwork")}*/}
        {/*  value={selectedNetwork?.id}*/}
        {/*  cta={t("wallet.deposit.selectNetwork")}*/}
        {/*  options={networks}*/}
        {/*  onChange={handleSelectNetwork}*/}
        {/*/>*/}
        {walletTrc && <QrCode walletKey={walletTrc.address} />}
        {/*<TextInput*/}
        {/*  label={t("wallet.deposit.walletAddress")}*/}
        {/*  name="walletId"*/}
        {/*  value={selectedNetwork?.address}*/}
        {/*  isDisabled*/}
        {/*  rightIcon="copy"*/}
        {/*  iconLabel={t("plans.selectSubscription.deposit.copy-button")}*/}
        {/*  onIconPress={() => copyToClipboard(selectedNetwork?.address)}*/}
        {/*/>*/}
      </View>
      <Button onPress={goBack}>{t("wallet.deposit.cta")}</Button>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  networkAddressContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#D4D4D8",
    borderRadius: 4,
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  description: {
    marginBottom: 24,
  },
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
})
