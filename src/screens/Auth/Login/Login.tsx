import { StyleSheet, View } from "react-native"
import { Trans, useTranslation } from "react-i18next"

import { AuthStackScreenProps } from "models/Navigation"
import { Button } from "components/Button"
import { CommonActions } from "@react-navigation/native"
import { FC } from "react"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { TextInput } from "components/TextInput"
import { Typography } from "components/Typography"
import { useAuthContext } from "context/AuthContext"
import { useLogin } from "hooks/auth/useLogin"
import { useLoginForm } from "hooks/auth/useLoginForm"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"

export type LoginProps = AuthStackScreenProps<typeof Routes.auth.login>

export const Login: FC<LoginProps> = ({ navigation }) => {
  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()

  const { login } = useLogin()
  const { setToken } = useAuthContext()

  const { t } = useTranslation()

  const { getTextFieldProps, handleSubmit, dirty, isValid } = useLoginForm({
    onSubmit: ({ email, password }) => {
      login(
        { email, password },
        {
          onSuccess: (token) => {
            setToken(token)
            navigation.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: Routes.main.navigator }] }),
            )
          },
        },
      )
    },
  })

  const goTologin = () => {
    navigation.navigate(Routes.auth.create_account)
  }

  return (
    <RootView
      style={[
        styles.container,
        {
          paddingHorizontal: space[6],
          paddingTop: top + space[6],
          paddingBottom: bottom + space[6],
        },
      ]}
    >
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View>
          <Typography size="h3" style={styles.title}>
            {t("login.title")}
          </Typography>

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

          <Typography textAlign="right" weight="semibold" style={styles.forgotPassword}>
            {t("login.forgotPassword")}
          </Typography>
        </View>

        <View>
          <Button
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
                bold: <Typography color="black" weight="semibold" onPress={goTologin} />,
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
    justifyContent: "space-between",
  },
  title: {
    marginBottom: 16,
  },
  forgotPassword: {
    marginBottom: 24,
    textAlign: "right",
  },
  button: {
    marginBottom: 40,
  },
})
