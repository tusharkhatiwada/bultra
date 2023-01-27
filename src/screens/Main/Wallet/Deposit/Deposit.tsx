import * as Clipboard from "expo-clipboard"

import { FC, useState } from "react"
import { Spinner, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"
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

export type DepositProps = WalletStackScreenProps<typeof Routes.main.wallet.deposit>

export const Deposit: FC<DepositProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { showToast } = useToastContext()
  const { wallet } = useGetWallet()

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

  if (!wallet) {
    return (
      <View style={[styles.container, styles.alignCenter]}>
        <Spinner />
      </View>
    )
  }

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
        <Select
          custom
          placeholder={t("common.select.placeholder", {
            label: t("wallet.deposit.network"),
          })}
          label={t("wallet.deposit.network")}
          bottomLabel={t("wallet.deposit.selectNetwork")}
          value={selectedNetwork?.id}
          cta={t("wallet.deposit.selectNetwork")}
          options={networks}
          onChange={handleSelectNetwork}
        />
        <TextInput
          label={t("wallet.deposit.walletAddress")}
          name="walletId"
          value={selectedNetwork?.address}
          isDisabled
          rightIcon="copy"
          iconLabel={t("plans.selectSubscription.deposit.copy-button")}
          onIconPress={() => copyToClipboard(selectedNetwork?.address)}
        />
        {!isNil(selectedNetwork) && <QrCode walletKey={selectedNetwork.address} />}
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
  description: {
    marginBottom: 24,
  },
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
})
