import * as Clipboard from "expo-clipboard"

import { Dispatch, FC, SetStateAction } from "react"
import { PlanTypes, Plans } from "models/Plans"
import { ScrollView, StyleSheet, View } from "react-native"
import { Spinner, useTheme } from "native-base"
import { Trans, useTranslation } from "react-i18next"

import { NetworkTypes } from "models/Networks"
import { Select } from "components/Select"
import { TextInput } from "components/TextInput"
import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { useToastContext } from "context/ToastContext"
import { useGetWallet } from "../../../../hooks/wallet/useGetWallet"

export type SelectSubscriptionProps = {
  selectedPlan: PlanTypes
  selectedNetwork: NetworkTypes
  setSelectedNetwork: Dispatch<SetStateAction<NetworkTypes>>
}

const walletID = "FG2022-OF93PP001XT0993AR"

export const SelectSubscription: FC<SelectSubscriptionProps> = ({
  selectedPlan,
  selectedNetwork,
  setSelectedNetwork,
}) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { showToast } = useToastContext()
  const { wallet } = useGetWallet()

  const copyToClipboard = async (value: string) => {
    await Clipboard.setStringAsync(value).then(() => {
      showToast({
        type: ToastType.info,
        title: value,
        description: t("plans.selectSubscription.deposit.copy-info"),
      })
    })
  }

  if (!wallet) {
    return (
      <View style={[styles.container, styles.alignCenter]}>
        <Spinner />
      </View>
    )
  }

  const networks = wallet.wallets.map((network) => {
    return { value: network.name, label: network.name }
  })

  return (
    <ScrollView style={styles.container}>
      <View style={styles.padding}>
        <Typography size="headline" weight="bold" style={styles.title}>
          {t("plans.selectSubscription.deposit.title")}
        </Typography>
        <Typography color="primary.400" style={styles.description}>
          {t("plans.selectSubscription.deposit.description")}
        </Typography>
        <Select
          custom
          placeholder={t("common.select.placeholder", {
            label: t("plans.selectSubscription.deposit.network"),
          })}
          label={t("plans.selectSubscription.deposit.network")}
          bottomLabel={t("plans.selectSubscription.deposit.label")}
          cta={t("plans.selectSubscription.deposit.cta")}
          options={networks}
          value={selectedNetwork}
          onChange={(value) => setSelectedNetwork(value as NetworkTypes)}
        />
        <TextInput
          label={t("translation:plans.selectSubscription.deposit.walletAddress")}
          name="walletId"
          value={walletID}
          isDisabled
          rightIcon="copy"
          iconLabel={t("plans.selectSubscription.deposit.copy-button")}
          onIconPress={() => copyToClipboard(walletID)}
        />
        <Typography color={colors.primary[400]} style={styles.description}>
          <Trans
            i18nKey={`translation:plans.selectSubscription.deposit.info`}
            values={{ price: Plans[selectedPlan].subscription }}
            components={{
              strong: <Typography weight="bold" color="primary.700" />,
            }}
          />
        </Typography>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 24,
  },
  padding: {
    padding: 24,
  },
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
})
