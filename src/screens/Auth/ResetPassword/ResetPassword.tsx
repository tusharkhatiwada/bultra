import { StyleSheet, View } from "react-native"

import { AuthStackScreenProps } from "models/Navigation"
import { Button } from "components/Button"
import { CommonActions } from "@react-navigation/native"
import { FC } from "react"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { TextInput } from "components/TextInput"
import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { useResetPassword } from "hooks/auth/useResetPassword"
import { useResetPasswordForm } from "hooks/auth/useResetPasswordForm"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useToastContext } from "context/ToastContext"
import { useTranslation } from "react-i18next"

export type ResetPasswordProps = AuthStackScreenProps<typeof Routes.auth.reset_password>

export const ResetPassword: FC<ResetPasswordProps> = ({ navigation, route }) => {
  const { token } = route.params

  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()
  const { showToast } = useToastContext()

  const { resetPassword, isLoading } = useResetPassword()

  const { t } = useTranslation()

  const { getTextFieldProps, handleSubmit, dirty, isValid } = useResetPasswordForm({
    onSubmit: ({ password }) => {
      resetPassword(
        { password, token },
        {
          onSuccess: () => {
            showToast({
              type: ToastType.info,
              title: t("forgotPassword.toast.title"),
              description: t("forgotPassword.toast.description"),
            })
            navigation.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: Routes.auth.login }] }),
            )
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
          paddingTop: top + space[6],
          paddingHorizontal: space[6],
          paddingBottom: bottom + space[6],
        },
      ]}
    >
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View>
          <Typography size="h3" weight="bold" style={styles.title}>
            {t("resetPassword.title")}
          </Typography>
          <TextInput
            type="password"
            label={t("resetPassword.form.password.label")}
            placeholder={t("resetPassword.form.password.placeholder")}
            autoCapitalize="none"
            autoComplete="off"
            {...getTextFieldProps("password")}
          />

          <TextInput
            type="password"
            label={t("resetPassword.form.repeatPassword.label")}
            placeholder={t("resetPassword.form.repeatPassword.placeholder")}
            autoCapitalize="none"
            autoComplete="off"
            {...getTextFieldProps("repeatPassword")}
          />
        </View>

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
    justifyContent: "space-between",
  },
  title: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 40,
  },
})
