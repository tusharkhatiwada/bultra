import { FC, useEffect } from "react"
import { Trans, useTranslation } from "react-i18next"

import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"
import { CommonActions } from "@react-navigation/native"
import { Button } from "components/Button"
import { RootView } from "components/RootView"
import { TextInput } from "components/TextInput"
import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { useToastContext } from "context/ToastContext"
import { useCreateAccount } from "hooks/auth/useCreateAccount"
import { useCreateAccountForm } from "hooks/auth/useCreateAccountForm"
import { AuthStackScreenProps } from "models/Navigation"
import { Routes } from "models/Routes"
import { useTheme } from "native-base"
import { StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { StorageKey, createSecureStorage } from "services/SecureStorage"
import { hashedPassword } from "utils/hash"
import { useAuthContext } from "../../../context/AuthContext"
import { useOtp } from "../../../hooks/auth/useOtp"
import { OtpForm } from "../../../hooks/auth/useOtpForm"
import { useGenerateSalt } from "hooks/hash/useGenerateSalt"

export type CreateAccountProps = AuthStackScreenProps<typeof Routes.auth.create_account>

export const CreateAccount: FC<CreateAccountProps> = ({ navigation, route }) => {
  const referralId = route?.params?.referralId
  const { t } = useTranslation()
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { sendOtp } = useOtp()
  const { setToken, login } = useAuthContext()
  const { showToast } = useToastContext()
  const storage = createSecureStorage()
  const { createAccount, isLoading, error } = useCreateAccount()
  const { generateSalt, isLoading: isSaltLoading } = useGenerateSalt()

  const submitOtp = (form: OtpForm, email: string) => {
    sendOtp(
      {
        email,
        code: form.otpCode,
      },
      {
        onSuccess: (response) => {
          setToken(response.accessToken.accessToken)
          showToast({
            type: ToastType.info,
            title: t("createAccount.toast.title"),
            description: t("createAccount.toast.description"),
          })
          navigation.dispatch(
            CommonActions.reset({ index: 0, routes: [{ name: Routes.main.navigator }] }),
          )
        },
        onError: () => {
          showToast({
            type: ToastType.error,
            title: t("login.form.otp.error"),
          })
        },
      },
    )
  }

  const { getTextFieldProps, handleSubmit, dirty, isValid, setValue } = useCreateAccountForm({
    onSubmit: async ({ email_address, hashed_password, repeat_password }) => {
      generateSalt(
        { email_address },
        {
          onSuccess: async (response) => {
            if (response.salt) {
              const password_hashed = await hashedPassword(hashed_password, response.salt)
              createAccount(
                { email_address, hashed_password: password_hashed, repeat_password },
                {
                  onSuccess: async () => {
                    storage.set(StorageKey.ACCESS_TOKEN, response.user_id)
                    storage.set(StorageKey.USER_EMAIL, email_address)
                    await login()
                    navigation.dispatch(
                      CommonActions.reset({ index: 0, routes: [{ name: Routes.main.navigator }] }),
                    )
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
            } else {
              showToast({
                type: ToastType.error,
                title: t("createAccount.toast.error.title"),
                description: "Please login to your account instead.",
              })
            }
          },
          onError: (error) => {
            console.log("==Error salt===", error)
            showToast({
              type: ToastType.error,
              title: "Error encrypting",
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
          {...getTextFieldProps("email_address")}
        />

        {/* <TextInput
          label={t("createAccount.form.referralId.label")}
          placeholder={t("createAccount.form.referralId.placeholder")}
          autoCapitalize="none"
          {...getTextFieldProps("ref")}
        /> */}

        <TextInput
          type="password"
          label={t("createAccount.form.password.label")}
          placeholder={t("createAccount.form.password.placeholder")}
          autoCapitalize="none"
          autoComplete="off"
          {...getTextFieldProps("hashed_password")}
        />

        <TextInput
          type="password"
          label={t("createAccount.form.repeatPassword.label")}
          placeholder={t("createAccount.form.repeatPassword.placeholder")}
          autoCapitalize="none"
          autoComplete="off"
          {...getTextFieldProps("repeat_password")}
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
          isLoading={isLoading || isSaltLoading}
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
