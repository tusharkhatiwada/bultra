import { StyleSheet } from "react-native"
import { FC } from "react"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"

import { AuthStackScreenProps } from "models/Navigation"
import { OtpInput } from "../../../components/OTPInput/OtpInput"

export type OtpProps = AuthStackScreenProps<typeof Routes.auth.otp>

export const Otp: FC<OtpProps> = ({ navigation }) => {
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()

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
        <OtpInput/>
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
})
