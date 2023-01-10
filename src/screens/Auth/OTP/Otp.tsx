import { StyleSheet } from "react-native"
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

export type OtpProps = AuthStackScreenProps<typeof Routes.auth.otp>

export const Otp: FC<OtpProps> = ({ navigation }) => {
  const [otp, setOtp] = useState<string[]>([])
  const [isError, setIsError] = useState<boolean>(false)
  const { sendOtp, isLoading } = useOtp()
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { setToken } = useAuthContext()
  const { t } = useTranslation()

  const { handleSubmit, setValue } = useOtpForm({
    onSubmit: (otpCode) => {
      sendOtp(otpCode,
        {
          onSuccess: (token) => {
            setToken(token)
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
        <OtpInput
          handleSetOtpItem={handleSetOtpItem}
          handleSetPastedOtp={handleSetPastedOtp}
          isError={isError}
        />
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
})
