import { StyleSheet, View } from "react-native"

import { Button } from "components/Button"
import { FC } from "react"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"
import { PhoneInput } from "components/PhoneInput"
import { ProfileStackScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { TextAreaInput } from "components/TextAreaInput"
import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { useSupportRequest } from "hooks/profile/useSupportRequest"
import { useSupportRequestForm } from "hooks/profile/useSupportRequestForm"
import { useToastContext } from "context/ToastContext"
import { useTranslation } from "react-i18next"

export type SupportProps = ProfileStackScreenProps<typeof Routes.main.profile.support>

export const Support: FC<SupportProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { showToast } = useToastContext()
  const { supportRequest, isLoading } = useSupportRequest()

  const { getTextFieldProps, handleSubmit, dirty, isValid } = useSupportRequestForm({
    onSubmit: ({ phoneNumber, message }) => {
      supportRequest(
        { phoneNumber, message },
        {
          onSuccess: () => {
            showToast({
              type: ToastType.success,
              title: "Success",
              description: t("profile.support.form.success"),
            })
            navigation.goBack()
          },
          onError: (err) => {
            showToast({
              type: ToastType.error,
              title: t("profile.support.form.error"),
              description: err.message,
            })
          },
        },
      )
    },
  })

  return (
    <RootView style={[styles.container, styles.padding]}>
      <KeyboardAwareScrollView enableOnAndroid contentContainerStyle={styles.container}>
        <View>
          <Typography color="primary.400" style={styles.description}>
            {t("profile.support.description")}
          </Typography>

          <View style={styles.phoneInput}>
            <PhoneInput
              label={t("profile.support.form.phoneNumber.label")}
              placeholder={t("common.phoneInput.placeholder")}
              {...getTextFieldProps("phoneNumber")}
            />
          </View>

          <TextAreaInput
            label={t("profile.support.form.message.label")}
            placeholder={t("profile.support.form.message.placeholder")}
            {...getTextFieldProps("message")}
          />
        </View>

        <Button
          isLoading={isLoading}
          isDisabled={!isValid || !dirty}
          onPress={() => handleSubmit()}
        >
          {t("profile.support.form.submit")}
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
  padding: {
    padding: 24,
  },
  description: {
    marginBottom: 24,
  },
  phoneInput: {
    marginBottom: 0,
  },
})
