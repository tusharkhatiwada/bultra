import { StyleSheet, TouchableOpacity, View } from "react-native"
import { FC, useEffect, useState } from "react"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useTranslation } from "react-i18next"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"

import { AuthStackScreenProps } from "models/Navigation"
import { OtpInput } from "../../../components/OTPInput/OtpInput"
import { Typography } from "../../../components/Typography"
import { Button } from "../../../components/Button"
import { useOtpForm } from "../../../hooks/auth/useOtpForm"
import { useResendOtp } from "../../../hooks/auth/useResendOtp"
import { useOtpTimer } from "../../../hooks/auth/useOtpTimer"

export type OtpProps = AuthStackScreenProps<typeof Routes.auth.otp>

export const Otp: FC<OtpProps> = ({ route }) => {
  const { email, codeEndTime, submitOtp } = route.params

  const [otp, setOtp] = useState<string[]>([])
  const [isError, setIsError] = useState<boolean>(false)

  const { resendOtp } = useResendOtp()
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { seconds, minutes, resetTimer } = useOtpTimer(codeEndTime)
  const showResend = minutes <= 0 && seconds === 0

  const { t } = useTranslation()

  const secondsString = seconds < 10 ? `0${seconds}` : seconds
  const minutesString = minutes > 0 ? minutes : "0"

  const handleResendOtp = () => {
    resetTimer()
    setOtp([])
    resendOtp({ email })
  }

  const { handleSubmit, setValue } = useOtpForm({
    onSubmit: (form) => {
      submitOtp(form, email)
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
          {!showResend ? (
            <Typography color="primary.400" style={styles.timer}>{`${t(
              "login.form.otp.timerText",
            )}: ${minutesString}:${secondsString}`}</Typography>
          ) : (
            <TouchableOpacity onPress={handleResendOtp}>
              <Typography color="primary.400" style={styles.timer}>
                {t("login.form.otp.resendCode")}
              </Typography>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAwareScrollView>
      <Button isLoading={false} isDisabled={otp.join("").length < 6} onPress={() => handleSubmit()}>
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
