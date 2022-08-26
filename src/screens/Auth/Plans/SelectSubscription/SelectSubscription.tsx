import * as Clipboard from "expo-clipboard"

import { Dispatch, FC, SetStateAction } from "react"
import { PlanTypes, Plans, SubscriptionTypes } from "models/Plans"
import { ScrollView, StyleSheet, View } from "react-native"
import { Stack, useTheme } from "native-base"
import { Trans, useTranslation } from "react-i18next"

import { Select } from "components/Select"
import { SubscriptionCard } from "./SubscriptionCard"
import { TextInput } from "components/TextInput"
import { Typography } from "components/Typography"
import { useToast } from "hooks/useToast"

export type SelectSubscriptionProps = {
  selectedPlan: PlanTypes
  selectedSubscription: SubscriptionTypes
  setSelectedSubscription: Dispatch<SetStateAction<SubscriptionTypes>>
  selectedNetwork: string
  setSelectedNetwork: Dispatch<SetStateAction<string>>
}

const walletID = "FG2022-OF93PP001XT0993AR"

export const SelectSubscription: FC<SelectSubscriptionProps> = ({
  selectedPlan,
  selectedSubscription,
  setSelectedSubscription,
  selectedNetwork,
  setSelectedNetwork,
}) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { toast } = useToast()

  const copyToClipboard = async (value: string) => {
    await Clipboard.setStringAsync(value).then(() => {
      toast.info(value, t("plans.selectSubscription.deposit.copy-info"))
    })
  }

  const isSelected = (sub: SubscriptionTypes) => sub === selectedSubscription

  return (
    <ScrollView style={styles.container}>
      <View style={styles.padding}>
        <Typography size="headline" weight="bold" style={styles.title}>
          {t("plans.selectSubscription.title")}
        </Typography>
        <Typography color="primary.400" style={styles.description}>
          {t("plans.selectSubscription.description")}
        </Typography>
        <Stack space="lg" accessibilityRole="radiogroup" direction="row">
          <SubscriptionCard
            selectedPlan={selectedPlan}
            subscriptionType={SubscriptionTypes.MONTHLY}
            selected={isSelected(SubscriptionTypes.MONTHLY)}
            selectSubscription={setSelectedSubscription}
          />

          <SubscriptionCard
            selectedPlan={selectedPlan}
            subscriptionType={SubscriptionTypes.BIENNIAL}
            selected={isSelected(SubscriptionTypes.BIENNIAL)}
            selectSubscription={setSelectedSubscription}
          />
        </Stack>
        <View style={{ ...styles.separator, backgroundColor: colors.primary[200] }} />
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
          options={[
            { label: "Network 1", value: "1" },
            { label: "Network 2", value: "2" },
          ]}
          defaultValue={selectedNetwork}
          onChange={setSelectedNetwork}
        />
        <TextInput
          label={t("translation:plans.selectSubscription.deposit.walletId")}
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
            values={{ price: Plans[selectedPlan].subscription[selectedSubscription] }}
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
  separator: {
    marginVertical: 16,
    width: "100%",
    height: 2,
    border: 2,
  },
  padding: {
    padding: 24,
  },
})
