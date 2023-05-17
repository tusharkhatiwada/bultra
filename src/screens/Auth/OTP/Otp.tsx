import { Pressable, StyleSheet, View } from "react-native"
import React, { FC, useEffect, useState } from "react"
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
import { useOtp } from "../../../hooks/auth/useOtp"

export type OtpProps = AuthStackScreenProps<typeof Routes.auth.otp>
const START_MINUTES = "04"
const START_SECOND = "01"
const START_DURATION = 10
export const Otp: FC<OtpProps> = ({ route }) => {
  const { email, submitOtp } = route.params

  const [otp, setOtp] = useState<string[]>([])
  const [isError, setIsError] = useState<boolean>(false)

  const { resendOtp } = useResendOtp()
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  // const { seconds, minutes, resetTimer } = useOtpTimer("2023-05-02T12:51:51.675Z")

  const { t } = useTranslation()
  const [currentMinutes, setMinutes] = useState<string>(START_MINUTES)
  const [currentSeconds, setSeconds] = useState<string>(START_SECOND)
  const { isSendOtpLoading } = useOtp()
  const [isStop, setIsStop] = useState(false)
  const [duration, setDuration] = useState(START_DURATION)
  const [isRunning, setIsRunning] = useState(false)

  const startHandler = () => {
    setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10))
    // setMinutes(60 * 5);
    // setSeconds(0);
    setIsRunning(true)
  }

  useEffect(() => {
    startHandler()
  }, [])

  const stopHandler = () => {
    // stop timer
    setIsStop(true)
    setIsRunning(false)
  }
  const resetHandler = () => {
    setMinutes(START_MINUTES)
    setSeconds(START_SECOND)
    setIsRunning(false)
    setIsStop(false)
    setDuration(START_DURATION)
  }

  const showResend = parseInt(currentMinutes) <= 0 && parseInt(currentSeconds) <= 1

  const resumeHandler = () => {
    const newDuration = parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10)
    setDuration(newDuration)

    setIsRunning(true)
    setIsStop(false)
  }

  const handleResendOtp = () => {
    resetHandler()
    setOtp([])
    resendOtp({ email })
    startHandler()
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

  useEffect(() => {
    if (isRunning === true && duration > 0) {
      let timer = duration
      let minutes, seconds
      const interval = setInterval(function () {
        if (--timer <= 0) {
          setIsRunning(false)
        } else {
          minutes = parseInt((timer / 60).toString(), 10)
          seconds = parseInt((timer % 60).toString(), 10)

          minutes = minutes < 10 ? "0" + minutes : minutes
          seconds = seconds < 10 ? "0" + seconds : seconds
          setMinutes(minutes.toString())
          setSeconds(seconds.toString())
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isRunning, duration])

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
            )}: ${currentMinutes}:${currentSeconds}`}</Typography>
          ) : (
            <Pressable onPress={handleResendOtp}>
              <Typography color="primary.800" style={styles.timer}>
                {t("login.form.otp.resendCode")}
              </Typography>
            </Pressable>
          )}
        </View>
      </KeyboardAwareScrollView>
      <Button
        isLoading={false}
        isDisabled={otp.join("").length < 6 || isSendOtpLoading}
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
