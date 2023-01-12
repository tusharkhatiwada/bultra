import { FC, useEffect } from "react"
import { Trans, useTranslation } from "react-i18next"

import { AuthStackScreenProps } from "models/Navigation"
import { Button } from "components/Button"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { StyleSheet } from "react-native"
import { TextInput } from "components/TextInput"
import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { useCreateAccount } from "hooks/auth/useCreateAccount"
import { useCreateAccountForm } from "hooks/auth/useCreateAccountForm"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useToastContext } from "context/ToastContext"

export type CreateAccountProps = AuthStackScreenProps<typeof Routes.auth.create_account>

export const CreateAccount: FC<CreateAccountProps> = ({ navigation, route }) => {
  const referralId = route?.params?.referralId

  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()

  const { createAccount, isLoading } = useCreateAccount()
  // const { setToken } = useAuthContext()
  const { showToast } = useToastContext()

  const { t } = useTranslation()

  const { getTextFieldProps, handleSubmit, dirty, isValid, setValue } = useCreateAccountForm({
    onSubmit: ({ email, password, referralId }) => {
      createAccount(
        { email, password, referralId },
        {
          onSuccess: (response) => {
            navigation.navigate(Routes.auth.otp, { email, codeEndTime: response.codeEndTime })
          },
          onError: () => {
            showToast({
              type: ToastType.error,
              title: t("createAccount.toast.error.title"),
              description: t("createAccount.toast.error.description"),
            })
          },
        },
      )
    },
  })

  const goToLogin = () => {
    navigation.navigate(Routes.auth.login)
  }

  useEffect(() => {
    if (referralId) {
      setValue("referralId", referralId)
    }
  }, [referralId])

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
          label={t("createAccount.form.email.label")}
          placeholder={t("createAccount.form.email.placeholder")}
          autoCapitalize="none"
          {...getTextFieldProps("email")}
        />

        <TextInput
          label={t("createAccount.form.referralId.label")}
          placeholder={t("createAccount.form.referralId.placeholder")}
          autoCapitalize="none"
          {...getTextFieldProps("referralId")}
        />

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

        <Typography color="primary.400" style={styles.disclaimer}>
          <Trans
            i18nKey="createAccount.disclaimer"
            components={{
              bold: <Typography color="primary.700" weight="semibold" />,
            }}
          />
        </Typography>

        <Button
          isLoading={isLoading}
          isDisabled={!isValid || !dirty}
          onPress={() => handleSubmit()}
          style={styles.button}
        >
          {t("createAccount.form.submit")}
        </Button>

        <Typography color="primary.400" align="center">
          <Trans
            i18nKey="createAccount.login"
            components={{
              bold: <Typography color="primary.700" weight="semibold" onPress={goToLogin} />,
            }}
          />
        </Typography>
      </KeyboardAwareScrollView>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  disclaimer: {
    marginBottom: 24,
  },
  button: {
    marginBottom: 40,
  },
})
