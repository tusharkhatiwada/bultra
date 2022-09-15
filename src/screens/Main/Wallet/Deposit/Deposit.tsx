import * as Clipboard from "expo-clipboard"

import { FC, useEffect, useState } from "react"
import { Spinner, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"

import { Button } from "components/Button"
import { NetworkTypes } from "models/Networks"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Select } from "components/Select"
import { TextInput } from "components/TextInput"
import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { WalletStackScreenProps } from "models/Navigation"
import { useGetNetworkList } from "hooks/wallet/useGetNetworkList"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useToastContext } from "context/ToastContext"
import { useTranslation } from "react-i18next"

export type DepositProps = WalletStackScreenProps<typeof Routes.main.wallet.deposit>
const walletID = "FG2022-OF93PP001XT0993AR"

export const Deposit: FC<DepositProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { showToast } = useToastContext()

  const [selectedNetwork, setSelectedNetwork] = useState<NetworkTypes>()

  const copyToClipboard = async (value: string) => {
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

  const { networkList } = useGetNetworkList()

  useEffect(() => {
    if (networkList) setSelectedNetwork(networkList[0].type)
  }, [networkList])

  if (!networkList) {
    return (
      <View style={[styles.container, styles.alignCenter]}>
        <Spinner />
      </View>
    )
  }

  const networks = networkList.map((network) => ({ value: network.type, label: network.name }))

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
          value={selectedNetwork}
          cta={t("wallet.deposit.selectNetwork")}
          options={networks}
          onChange={(value) => setSelectedNetwork(value as NetworkTypes)}
        />
        <TextInput
          label={t("wallet.deposit.walletAddress")}
          name="walletId"
          value={walletID}
          isDisabled
          rightIcon="copy"
          iconLabel={t("plans.selectSubscription.deposit.copy-button")}
          onIconPress={() => copyToClipboard(walletID)}
        />
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
