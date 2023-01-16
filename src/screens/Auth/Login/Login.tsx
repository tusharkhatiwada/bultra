import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Trans, useTranslation } from "react-i18next"

import { AuthStackScreenProps } from "models/Navigation"
import { Button } from "components/Button"
import { FC } from "react"
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

export type LoginProps = AuthStackScreenProps<typeof Routes.auth.login>

export const Login: FC<LoginProps> = ({ navigation }) => {
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()

  const { login, isLoading } = useLogin()
  const { resendOtp } = useResendOtp()
  const { setToken } = useAuthContext()
  const { showToast } = useToastContext()
  const { sendOtp } = useOtp()

  const { t } = useTranslation()

  const submitOtp = (form: OtpForm, email: string) => {
    sendOtp({
        email,
        code: form.otpCode,
      },
      {
        onSuccess: (response) => {
          setToken(response.accessToken)
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

  const { getTextFieldProps, handleSubmit, dirty, isValid } = useLoginForm({
    onSubmit: ({ email, password }) => {
      login(
        { email, password },
        {
          onSuccess: (response) => {
            if(isNil(response.status)){
              setToken(response.accessToken)
              navigation.dispatch(
                CommonActions.reset({ index: 0, routes: [{ name: Routes.main.navigator }] }),
              )
            }else{
              resendOtp({email})
              navigation.navigate(Routes.auth.otp, { email, submitOtp })
            }
          },
          onError: () => {
            showToast({
              type: ToastType.error,
              title: t("login.errors.loginFailed"),
              description: t("login.errors.checkCredentials"),
            })
          },
        },
      )
    },
  })

  const goToSignUp = () => {
    navigation.navigate(Routes.auth.create_account)
  }

  const goToForgotPassword = () => {
    navigation.navigate(Routes.auth.forgot_password)
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
            {...getTextFieldProps("email")}
          />

          <TextInput
            type="password"
            label={t("login.form.password.label")}
            placeholder={t("login.form.password.placeholder")}
            autoCapitalize="none"
            autoComplete="off"
            {...getTextFieldProps("password")}
          />

          <TouchableOpacity onPress={goToForgotPassword}>
            <Typography textAlign="right" weight="semibold" style={styles.forgotPassword}>
              {t("login.forgotPassword")}
            </Typography>
          </TouchableOpacity>
        </View>

        <View>
          <Button
            isLoading={isLoading}
            isDisabled={!isValid || !dirty}
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
