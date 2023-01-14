import { StyleSheet, View } from "react-native"

import { AuthStackScreenProps } from "models/Navigation"
import { Button } from "components/Button"
import { FC } from "react"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { TextInput } from "components/TextInput"
import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { useForgotPassword } from "hooks/auth/useForgotPassword"
import { useForgotPasswordForm } from "hooks/auth/useForgotPasswordForm"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useToastContext } from "context/ToastContext"
import { useTranslation } from "react-i18next"

export type ForgotPasswordProps = AuthStackScreenProps<typeof Routes.auth.forgot_password>

export const ForgotPassword: FC<ForgotPasswordProps> = ({navigation}) => {
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { showToast } = useToastContext()

  const { forgotPassword, isLoading } = useForgotPassword()

  const { t } = useTranslation()

  const { getTextFieldProps, handleSubmit, dirty, isValid } = useForgotPasswordForm({
    onSubmit: ({ email }) => {
      forgotPassword(
        { email },
        {
          onSuccess: (response) => {
            showToast({
              type: ToastType.info,
              title: t("forgotPassword.toast.title"),
              description: t("forgotPassword.toast.description"),
            })
            navigation.navigate(Routes.auth.forgot_password_otp, { email, codeEndTime: response.codeEndTime })
          },
          onError: () => {
            showToast({
              type: ToastType.error,
              title: 'Email not registered',
              description: t("createAccount.toast.error.description"),
            })
          },
        },
      )
    },
  })

  return (
    <RootView
      style={[
        styles.container,
        {
          paddingHorizontal: space[6],
          paddingBottom: bottom + space[6],
        },
      ]}
    >
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View>
          <Typography color="primary.400" style={styles.marginBottom}>
            {t("forgotPassword.description")}
          </Typography>
          <TextInput
            label={t("login.form.email.label")}
            placeholder={t("login.form.email.placeholder")}
            autoCapitalize="none"
            {...getTextFieldProps("email")}
          />
        </View>

        <Button
          isLoading={isLoading}
          isDisabled={!isValid || !dirty}
          onPress={() => handleSubmit()}
          style={styles.marginBottom}
        >
          {t("forgotPassword.submit")}
        </Button>
      </KeyboardAwareScrollView>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    justifyContent: "space-between",
  },
  marginBottom: {
    marginBottom: 40,
  },
})
