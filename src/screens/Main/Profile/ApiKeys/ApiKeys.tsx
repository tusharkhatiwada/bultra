import { View, StyleSheet } from "react-native"
import { FC, useEffect, useState } from "react"
import { ProfileStackScreenProps } from "models/Navigation"
import { Routes } from "models/Routes"
import { RootView } from "components/RootView"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"
import { useTheme, Button } from "native-base"
import { useTranslation } from "react-i18next"
import { useToastContext } from "context/ToastContext"
import { ToastType } from "components/Toast/Toast"
import { TextInput } from "components/TextInput"
import { Select } from "components/Select"
import { riskLevelsList } from "models/RiskLevels"
import { useActivateBotForm } from "hooks/trade/useActivateBotForm"
import { useActivateBot } from "hooks/trade/useActivateBot"
import { StorageKey, createSecureStorage } from "services/SecureStorage"

export type ApiKeysProps = ProfileStackScreenProps<typeof Routes.main.profile.support>

export const ApiKeys: FC<ApiKeysProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { space } = useTheme()
  const { showToast } = useToastContext()
  const storage = createSecureStorage()
  const [riskLevel, setRiskLevel] = useState<string | undefined>(riskLevelsList[1].value)
  const [userTradingEmail, setUserTradingEmail] = useState<string | undefined>("")
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    const getUserDetails = async () => {
      const userEmail = (await storage.get(StorageKey.USER_TRADING_EMAIL)) as string
      setUserTradingEmail(userEmail)
      const userId = (await storage.get(StorageKey.ACCESS_TOKEN)) as string
      setUserId(userId)
    }

    getUserDetails()
  }, [])

  const {
    activateBot: activateBotApi,
    data: activateData,
    isSuccess: isActivateSuccess,
    isLoading: isActivateLoading,
  } = useActivateBot()

  const handleChangeRiskLevel = (level: string) => {
    setRiskLevel(level)
  }

  const { getTextFieldProps, handleSubmit, dirty, isValid } = useActivateBotForm({
    defaultValues: {
      key: "**********",
      secret: "*************************",
    },
    onSubmit: ({ key, secret }) => {
      if (!riskLevel) {
        return showToast({
          type: ToastType.error,
          title: t("profile.apiKeys.chooseRiskLevel"),
        })
      }

      activateBotApi(
        {
          key,
          secret,
          risk_level: riskLevel as string,
          user_id: userId,
          email_address: userTradingEmail as string,
        },
        {
          onSuccess: () => {
            storage.set(StorageKey.BOT_KEY, key)
            storage.set(StorageKey.BOT_SECRET, secret)
            storage.set(StorageKey.RISK_LEVEL, riskLevel)
            showToast({
              type: ToastType.success,
              title: "Success",
              description: t("profile.apiKeys.form.success"),
            })
            navigation.goBack()
          },
          onError: () =>
            showToast({
              type: ToastType.error,
              title: t("profile.apiKeys.form.error"),
            }),
        },
      )
    },
  })
  return (
    <RootView style={[styles.container, { padding: space[6] }]}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View>
          <TextInput
            label={t("profile.apiKeys.form.apiKey.label")}
            placeholder={t("profile.apiKeys.form.apiKey.placeholder")}
            {...getTextFieldProps("key")}
          />

          <TextInput
            label={t("profile.apiKeys.form.secretKey.label")}
            placeholder={t("profile.apiKeys.form.secretKey.placeholder")}
            {...getTextFieldProps("secret")}
          />
          <Select
            custom
            label={t("profile.apiKeys.chooseRiskLevel")}
            bottomLabel={t("profile.apiKeys.changeRiskLevel")}
            cta={t("profile.apiKeys.chooseRiskLevel")}
            value={riskLevel}
            options={riskLevelsList}
            onChange={handleChangeRiskLevel}
          />
        </View>

        <Button
          isLoading={isActivateLoading}
          isDisabled={!isValid || !dirty}
          onPress={() => handleSubmit()}
        >
          {t("profile.apiKeys.form.submit")}
        </Button>
      </KeyboardAwareScrollView>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  forgotPassword: {
    marginBottom: 24,
    textAlign: "right",
  },
})
