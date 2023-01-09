import { StyleSheet } from "react-native"
import { FC, useState } from "react"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"

import { AuthStackScreenProps } from "models/Navigation"
import { OtpInput } from "../../../components/OTPInput/OtpInput"
import { Typography } from "../../../components/Typography"
import { useTranslation } from "react-i18next"
import { Button } from "../../../components/Button"

export type OtpProps = AuthStackScreenProps<typeof Routes.auth.otp>

export const Otp: FC<OtpProps> = () => {
  const [otp, setOtp] = useState<string[]>([])
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation()

  const handleSetOtpItem = (code: string, index: number) => {
    const otpCopy = [...otp]
    otpCopy[index] = code
    setOtp(otpCopy)
  }

  const handleSetPastedOtp = (fullCode: string[]) => {
    setOtp(fullCode);
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
        />
      </KeyboardAwareScrollView>
      <Button
        // isLoading={isLoading}
        isDisabled={otp.join("").length < 6}
        onPress={() => console.log('!!!!')}
        style={styles.button}
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
  button: {
    marginBottom: 40,
  },
})
