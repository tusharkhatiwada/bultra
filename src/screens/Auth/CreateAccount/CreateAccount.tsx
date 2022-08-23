import { ScrollView, StyleSheet } from "react-native"
import { Trans, useTranslation } from "react-i18next"

import { AuthStackScreenProps } from "models/Navigation"
import { Button } from "components/Button"
import { CommonActions } from "@react-navigation/native"
import { FC } from "react"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { TextInput } from "components/TextInput"
import { Typography } from "components/Typography"
import { useAuthContext } from "context/AuthContext"
import { useCreateAccount } from "hooks/auth/useCreateAccount"
import { useCreateAccountForm } from "hooks/auth/useCreateAccountForm"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"

export type CreateAccountProps = AuthStackScreenProps<typeof Routes.auth.create_account>

export const CreateAccount: FC<CreateAccountProps> = ({ navigation }) => {
  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()

  const { createAccount } = useCreateAccount()
  const { setToken } = useAuthContext()

  const { t } = useTranslation()

  const { getTextFieldProps, handleSubmit, dirty, isValid } = useCreateAccountForm({
    onSubmit: ({ email, password, referralId }) => {
      createAccount(
        { email, password, referralId },
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

  const goToLogin = () => {
    navigation.navigate(Routes.auth.login)
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
      <ScrollView>
        <Typography size="h3" style={styles.title}>
          {t("createAccount.title")}
        </Typography>

        <TextInput
          label={t("createAccount.form.email.label")}
          placeholder={t("createAccount.form.email.placeholder")}
          autoCapitalize="none"
          {...getTextFieldProps("email")}
        />

        <TextInput
          label={t("createAccount.form.referralId.label")}
          placeholder={t("createAccount.form.referralId.placeholder")}
          autoCapitalize="none"
          {...getTextFieldProps("referralId")}
        />

        <TextInput
          type="password"
          label={t("createAccount.form.password.label")}
          placeholder={t("createAccount.form.password.placeholder")}
          autoCapitalize="none"
          autoComplete="off"
          {...getTextFieldProps("password")}
        />

        <TextInput
          type="password"
          label={t("createAccount.form.repeatPassword.label")}
          placeholder={t("createAccount.form.repeatPassword.placeholder")}
          autoCapitalize="none"
          autoComplete="off"
          {...getTextFieldProps("repeatPassword")}
        />

        <Typography color="primary.400" style={styles.disclaimer}>
          <Trans
            i18nKey="createAccount.disclaimer"
            components={{
              bold: <Typography color="black" weight="semibold" />,
            }}
          />
        </Typography>

        <Button
          isDisabled={!isValid || !dirty}
          onPress={() => handleSubmit()}
          style={styles.button}
        >
          {t("createAccount.form.submit")}
        </Button>

        <Typography color="primary.400" align="center">
          <Trans
            i18nKey="createAccount.login"
            components={{
              bold: <Typography color="black" weight="semibold" onPress={goToLogin} />,
            }}
          />
        </Typography>
      </ScrollView>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 16,
  },
  disclaimer: {
    marginBottom: 24,
  },
  button: {
    marginBottom: 40,
  },
})
