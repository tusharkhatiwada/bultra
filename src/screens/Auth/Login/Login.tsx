import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Trans, useTranslation } from "react-i18next"

import { AuthStackScreenProps } from "models/Navigation"
import { Button } from "components/Button"
import React, { FC } from "react"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { TextInput } from "components/TextInput"
import { Typography } from "components/Typography"
import { useLogin } from "hooks/auth/useLogin"
import { useLoginForm } from "hooks/auth/useLoginForm"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { ToastType } from "../../../components/Toast/Toast"
import { useToastContext } from "../../../context/ToastContext"
import { CommonActions } from "@react-navigation/native"
import { useAuthContext } from "../../../context/AuthContext"
import { isNil } from "lodash"
import { useResendOtp } from "../../../hooks/auth/useResendOtp"
import { OtpForm } from "../../../hooks/auth/useOtpForm"
import { useOtp } from "../../../hooks/auth/useOtp"
import { useGetSalt } from "hooks/hash/useGetSalt"
import { hashedPassword } from "utils/hash"
import { StorageKey, createSecureStorage } from "services/SecureStorage"

export type LoginProps = AuthStackScreenProps<typeof Routes.auth.login>

export const Login: FC<LoginProps> = ({ navigation }) => {
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const [state, setState] = React.useState({ email: "", password: "", loading: false })
  const {
    data,
    isLoading: isFetchingSalt,
    isSuccess,
  } = useGetSalt({ email_address: state.email, fetching: state.loading })

  const { login, isLoading } = useLogin()
  const { resendOtp } = useResendOtp()
  const { setToken, setUser, login: doLogin } = useAuthContext()
  const { showToast } = useToastContext()
  const { sendOtp } = useOtp()
  const storage = createSecureStorage()

  const { t } = useTranslation()

  const submitOtp = (form: OtpForm, email: string) => {
    sendOtp(
      {
        email,
        code: form.otpCode,
      },
      {
        onSuccess: (response) => {
          setToken(response.accessToken.accessToken)
          setUser(response.user)
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

  const handleLogin = React.useCallback(async () => {
    console.log("state", state.password, data?.salt)
    if (state?.password && data?.salt) {
      const password_hashed = await hashedPassword(state.password, data?.salt as string)
      login(
        { email_address: state.email, hashed_password: password_hashed },
        {
          onSuccess: async (response) => {
            if (response?.message?.includes("wrong")) {
              showToast({
                type: ToastType.error,
                title: "Email & password doesn't match",
              })
            } else {
              storage.set(StorageKey.ACCESS_TOKEN, data.user_id)
              storage.set(StorageKey.USER_EMAIL, state.email)
              await doLogin()
              navigation.dispatch(
                CommonActions.reset({ index: 0, routes: [{ name: Routes.main.navigator }] }),
              )
            }
            setState({ ...state, loading: false })
          },
          onError: (err) => {
            showToast({
              type: ToastType.error,
              title: t("login.errors.loginFailed"),
              description: t("login.errors.checkCredentials"),
            })
          },
        },
      )
    }
  }, [state.password, data?.salt])

  React.useEffect(() => {
    if (data?.message) {
      showToast({
        type: ToastType.error,
        title: "User doesn't exists",
      })
      setState({ ...state, loading: false })
    } else {
      handleLogin()
    }
  }, [isFetchingSalt, isSuccess])

  const { getTextFieldProps, handleSubmit, dirty, isValid, resetForm } = useLoginForm({
    onSubmit: ({ email_address, hashed_password }) => {
      setState({ ...state, email: email_address, password: hashed_password, loading: true })
    },
  })

  const goToSignUp = () => {
    navigation.navigate(Routes.auth.create_account)
    resetForm()
  }

  const goToForgotPassword = () => {
    navigation.navigate(Routes.auth.forgot_password)
    resetForm()
  }

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
          <TextInput
            label={t("login.form.email.label")}
            placeholder={t("login.form.email.placeholder")}
            autoCapitalize="none"
            {...getTextFieldProps("email_address")}
          />

          <TextInput
            type="password"
            label={t("login.form.password.label")}
            placeholder={t("login.form.password.placeholder")}
            autoCapitalize="none"
            autoComplete="off"
            {...getTextFieldProps("hashed_password")}
          />

          <TouchableOpacity onPress={goToForgotPassword}>
            <Typography textAlign="right" weight="semibold" style={styles.forgotPassword}>
              {t("login.forgotPassword")}
            </Typography>
          </TouchableOpacity>
        </View>

        <View>
          <Button
            isLoading={isLoading || state.loading}
            isDisabled={!isValid || !dirty || state.loading}
            onPress={() => handleSubmit()}
            style={styles.button}
          >
            {t("login.form.submit")}
          </Button>

          <Typography color="primary.400" align="center">
            <Trans
              i18nKey="login.signUp"
              components={{
                bold: <Typography color="black" weight="semibold" onPress={goToSignUp} />,
              }}
            />
          </Typography>
        </View>
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
  forgotPassword: {
    marginBottom: 24,
    textAlign: "right",
  },
  button: {
    marginBottom: 40,
  },
})
