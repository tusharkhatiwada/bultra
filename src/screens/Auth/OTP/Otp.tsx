import { StyleSheet, TouchableOpacity, View } from "react-native"
import { FC, useEffect, useState } from "react"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useTranslation } from "react-i18next"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"

import { AuthStackScreenProps } from "models/Navigation"
import { CommonActions } from "@react-navigation/native"
import { OtpInput } from "../../../components/OTPInput/OtpInput"
import { Typography } from "../../../components/Typography"
import { Button } from "../../../components/Button"
import { useAuthContext } from "../../../context/AuthContext"
import { useOtpForm } from "../../../hooks/auth/useOtpForm"
import { useOtp } from "../../../hooks/auth/useOtp"
import { useToastContext } from "../../../context/ToastContext"
import { ToastType } from "../../../components/Toast/Toast"
import { useResendOtp } from "../../../hooks/auth/useResendOtp"
import { useOtpTimer } from "../../../hooks/auth/useOtpTimer"

export type OtpProps = AuthStackScreenProps<typeof Routes.auth.otp>

export const Otp: FC<OtpProps> = ({ navigation, route }) => {
  const { email, codeEndTime } = route.params

  const [otp, setOtp] = useState<string[]>([])
  const [isError, setIsError] = useState<boolean>(false)


  const { sendOtp, isLoading } = useOtp()
  const { resendOtp } = useResendOtp()
  const { showToast } = useToastContext()
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { setToken } = useAuthContext()
  const { seconds, minutes, resetTimer } = useOtpTimer(codeEndTime)
  const showResend = minutes <= 0 && seconds === 0

  const { t } = useTranslation()

  const secondsString = seconds < 10 ? `0${seconds}` : seconds
  const minutesString = minutes > 0 ? minutes : "0"

  const handleResendOtp = () => {
    resetTimer()
    resendOtp({ email })
  }

  const { handleSubmit, setValue } = useOtpForm({
    onSubmit: (form) => {
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
            setIsError(true)
          },
        },
      )
    },
  })

  useEffect(() => {
    setValue("otpCode", otp.join(""))
  }, [otp])

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(false)
      }, 3000)
    }
  }, [isError])

  const handleSetOtpItem = (code: string, index: number) => {
    const otpCopy = [...otp]
    otpCopy[index] = code
    setOtp(otpCopy)
  }

  const handleSetPastedOtp = (fullCode: string[]) => {
    setOtp(fullCode)
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
      <Typography color="primary.400" style={styles.description}>
        {t("login.form.otp.description")}
      </Typography>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.otpInfoContainer}>
          <OtpInput
            handleSetOtpItem={handleSetOtpItem}
            handleSetPastedOtp={handleSetPastedOtp}
            isError={isError}
          />
          {!showResend
            ? <Typography color="primary.400"
                          style={styles.timer}>{`${t("login.form.otp.timerText")}: ${minutesString}:${secondsString}`}</Typography>
            : <TouchableOpacity onPress={handleResendOtp}>
              <Typography color="primary.400" style={styles.timer}>
                {t("login.form.otp.resendCode")}
              </Typography>
            </TouchableOpacity>
          }
        </View>
      </KeyboardAwareScrollView>
      <Button
        isLoading={isLoading}
        isDisabled={otp.join("").length < 6}
        onPress={() => handleSubmit()}
      >
        {t("login.form.submitOtp")}
      </Button>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    justifyContent: "space-between",
  },
  description: {
    marginBottom: 24,
  },
  timer: {
    marginTop: 24,
  },
  otpInfoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
})
