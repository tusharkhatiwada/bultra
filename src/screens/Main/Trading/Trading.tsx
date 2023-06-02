import { RootView } from "components/RootView"
import { TextInput } from "components/TextInput"
import { Typography } from "components/Typography"
import { useTheme } from "native-base"
import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { CommonActions } from "@react-navigation/native"
import { Button } from "components/Button"
import { ToastType } from "components/Toast/Toast"
import { useToastContext } from "context/ToastContext"
import * as Clipboard from "expo-clipboard"
import { Routes } from "models/Routes"
import { StorageKey, createSecureStorage } from "services/SecureStorage"

const internalEmail = "corporative@exchangefusioncorp.com"

export const Trading: FC<any> = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation()
  const { space } = useTheme()
  const { showToast } = useToastContext()
  const storage = createSecureStorage()
  const [userEmail, setUserEmail] = useState<string>("")

  useEffect(() => {
    const getUserEmail = async () => {
      const email = await storage.get(StorageKey.USER_EMAIL)
      email && setUserEmail(email)
    }
    getUserEmail()
  })

  const copyToClipboard = async (value: string) => {
    await Clipboard.setStringAsync(value).then(() => {
      showToast({
        type: ToastType.info,
        title: value,
        description: t("startTrading.copy-info"),
      })
    })
  }

  const initiateTrading = async () => {
    storage.set(StorageKey.USER_TRADING_EMAIL, userEmail)
    storage.set(StorageKey.INITIATE_TRADING, "true")
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: Routes.main.navigator }] }),
    )
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
      <View>
        <Typography color="primary.800" size="h3" weight="bold">
          USDT Deposit
        </Typography>
        <Typography style={styles.bodyText}>
          Go to Internal transfer and withdraw to the next email:
        </Typography>
        <TextInput
          label={""}
          name="internalEmail"
          value={internalEmail}
          isDisabled
          rightIcon="copy"
          iconLabel={t("startTrading.copy-button")}
          onIconPress={() => copyToClipboard(internalEmail)}
        />
        <Typography style={styles.bodyText}>
          Write the email if you are using a different in bybit account to transfer. If not, let the
          input in blank
        </Typography>
        <TextInput
          label={""}
          placeholder={t("login.form.email.placeholder")}
          autoCapitalize="none"
          name="email"
          value={userEmail}
          onChangeText={(text) => setUserEmail(text)}
        />
        <Typography style={styles.bodyText}>
          Click finish after you have sent the 50 USDT from your bybit application. We will activate
          the bot when we receive the price of the plan ( up to 24H)
        </Typography>
      </View>

      <Button onPress={initiateTrading}>{t("common.finish")}</Button>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    justifyContent: "space-between",
  },
  bodyText: {
    marginVertical: 5,
  },
})
