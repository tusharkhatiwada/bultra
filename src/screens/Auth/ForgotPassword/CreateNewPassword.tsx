import { FC } from "react"
import { useTranslation } from "react-i18next"

import { AuthStackScreenProps } from "models/Navigation"
import { Button } from "components/Button"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { StyleSheet } from "react-native"
import { TextInput } from "components/TextInput"
import { ToastType } from "components/Toast/Toast"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useToastContext } from "context/ToastContext"
import { useCreateNewPasswordForm } from "../../../hooks/auth/useCreateNewPasswordForm"
import { usePasswordRecovery } from "../../../hooks/auth/usePasswordRecovery"

export type CreateNewPasswordProps = AuthStackScreenProps<
  typeof Routes.auth.forgot_password_create_new
>

export const CreateNewPassword: FC<CreateNewPasswordProps> = ({ navigation, route }) => {
  const { email, hash } = route.params

  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()

  const { passwordRecovery, isLoading } = usePasswordRecovery()
  const { showToast } = useToastContext()

  const { t } = useTranslation()

  const { getTextFieldProps, handleSubmit, dirty, isValid } = useCreateNewPasswordForm({
    onSubmit: ({ password }) => {
      passwordRecovery(
        { email, password, hash },
        {
          onSuccess: () => {
            showToast({
              type: ToastType.success,
              title: t("resetPassword.toast.title"),
              description: t("resetPassword.toast.description"),
            })
            navigation.navigate(Routes.auth.login)
          },
          onError: () => {
            showToast({
              type: ToastType.error,
              title: "Password change error",
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
      <KeyboardAwareScrollView enableOnAndroid>
        <TextInput
          type="password"
          label={t("createAccount.form.password.label")}
          placeholder={t("createAccount.form.password.placeholder")}
          autoCapitalize="none"
          autoComplete="off"
          {...getTextFieldProps("password")}
        />

        <TextInput
          type="password"
          label={t("createAccount.form.repeatPassword.label")}
          placeholder={t("createAccount.form.repeatPassword.placeholder")}
          autoCapitalize="none"
          autoComplete="off"
          {...getTextFieldProps("repeatPassword")}
        />

        <Button
          isLoading={isLoading}
          isDisabled={!isValid || !dirty}
          onPress={() => handleSubmit()}
          style={styles.button}
        >
          {t("resetPassword.form.submit")}
        </Button>
      </KeyboardAwareScrollView>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  button: {
    marginBottom: 40,
  },
})
