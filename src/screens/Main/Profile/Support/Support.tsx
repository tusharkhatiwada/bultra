import { Button, ScrollView, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"

import { FC } from "react"
import { PhoneInput } from "components/PhoneInput"
import { ProfileStackScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { TextAreaInput } from "components/TextAreaInput"
import { Typography } from "components/Typography"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useSupportRequest } from "hooks/profile/useSupportRequest"
import { useSupportRequestForm } from "hooks/profile/useSupportRequestForm"
import { useToast } from "hooks/useToast"
import { useTranslation } from "react-i18next"

export type SupportProps = ProfileStackScreenProps<typeof Routes.main.profile.support>

export const Support: FC<SupportProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { toast } = useToast()
  const { supportRequest } = useSupportRequest()
  const { getTextFieldProps, handleSubmit, dirty, isValid } = useSupportRequestForm({
    onSubmit: ({ phoneNumber, message }) => {
      supportRequest(
        { phoneNumber, message },
        {
          onSuccess: () => {
            toast.success("Success", t("profile.support.form.success"))
            navigation.goBack()
          },
          onError: (err) => toast.error(t("profile.support.form.error"), err.message),
        },
      )
    },
  })

  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()

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
      <ScrollView contentContainerStyle={styles.container}>
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

        <View>
          <Button isDisabled={!isValid || !dirty} onPress={() => handleSubmit()}>
            {t("profile.support.form.submit")}
          </Button>
        </View>
      </ScrollView>
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
  phoneInput: {
    marginBottom: 0,
  },
})
