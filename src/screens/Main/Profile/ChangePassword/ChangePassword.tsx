import { Button, useTheme } from "native-base"
import { StyleSheet, TouchableOpacity, View } from "react-native"

import { FC, useCallback, useEffect, useState } from "react"
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view"
import { ProfileStackScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { TextInput } from "components/TextInput"
import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { useChangePassword } from "hooks/profile/useChangePassword"
import { useChangePasswordForm } from "hooks/profile/useChangePasswordForm"
import { useToastContext } from "context/ToastContext"
import { useTranslation } from "react-i18next"
import { useGetSalt } from "hooks/hash/useGetSalt"
import { StorageKey, createSecureStorage } from "services/SecureStorage"
import { hashedPassword } from "utils/hash"

export type ChangePasswordProps = ProfileStackScreenProps<typeof Routes.main.profile.support>

export const ChangePassword: FC<ChangePasswordProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const storage = createSecureStorage()
  const { showToast } = useToastContext()
  const [state, setState] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    loading: false,
  })
  const {
    data,
    isLoading: isFetchingSalt,
    isSuccess,
    fetchStatus,
    isError,
  } = useGetSalt({ email_address: state.email, fetching: state.loading })

  const { space } = useTheme()

  const { changePassword, isLoading } = useChangePassword()
  const { getTextFieldProps, handleSubmit, dirty, isValid } = useChangePasswordForm({
    onSubmit: async ({ oldPassword, newPassword }) => {
      const email = (await storage.get(StorageKey.USER_EMAIL)) as string
      setState({ ...state, email, oldPassword, newPassword, loading: true })
    },
  })

  const handleChange = useCallback(async () => {
    if (state?.oldPassword && data?.salt) {
      console.log("===here===")
      const hashed = (await storage.get(StorageKey.HASHED_PASSWORD)) as string
      const old_password_hashed = await hashedPassword(state.oldPassword, data?.salt as string)
      if (hashed === old_password_hashed) {
        const new_password_hashed = await hashedPassword(state.newPassword, data?.salt as string)
        changePassword(
          { email_address: state.email, hashed_password: new_password_hashed },
          {
            onSuccess: () => {
              storage.set(StorageKey.HASHED_PASSWORD, new_password_hashed)
              showToast({
                type: ToastType.success,
                title: "Success",
                description: t("profile.changePassword.form.success"),
              })
              navigation.goBack()
            },
            onError: () =>
              showToast({
                type: ToastType.error,
                title: t("profile.changePassword.form.error"),
              }),
          },
        )
      } else {
        setState({ ...state, oldPassword: "", loading: false })
        showToast({
          type: ToastType.error,
          title: t("resetPassword.errors.wrongPassword"),
        })
      }
    }
  }, [state?.oldPassword, state?.newPassword, data?.salt])

  useEffect(() => {
    console.log("====Salt data===", data)
    if (data?.message) {
      showToast({
        type: ToastType.error,
        title: t("profile.changePassword.form.error"),
      })
      setState({ ...state, loading: false })
    } else {
      handleChange()
    }
  }, [isSuccess])

  const goToForgotPassword = () => {
    navigation.navigate(Routes.auth.navigator, { screen: Routes.auth.forgot_password })
  }

  return (
    <RootView style={[styles.container, { padding: space[6] }]}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View>
          <TextInput
            type="password"
            autoCapitalize="none"
            autoComplete="off"
            label={t("profile.changePassword.form.oldPassword.label")}
            placeholder={t("profile.changePassword.form.oldPassword.placeholder")}
            {...getTextFieldProps("oldPassword")}
          />

          <TextInput
            type="password"
            autoCapitalize="none"
            autoComplete="off"
            label={t("profile.changePassword.form.newPassword.label")}
            placeholder={t("profile.changePassword.form.newPassword.placeholder")}
            {...getTextFieldProps("newPassword")}
          />

          <TextInput
            type="password"
            autoCapitalize="none"
            autoComplete="off"
            label={t("profile.changePassword.form.repeatPassword.label")}
            placeholder={t("profile.changePassword.form.repeatPassword.placeholder")}
            {...getTextFieldProps("repeatPassword")}
          />

          {/* <TouchableOpacity onPress={goToForgotPassword}>
            <Typography textAlign="right" weight="semibold" style={styles.forgotPassword}>
              {t("login.forgotPassword")}
            </Typography>
          </TouchableOpacity> */}
        </View>

        <Button
          isLoading={isLoading || state.loading}
          isDisabled={!isValid || !dirty}
          onPress={() => handleSubmit()}
        >
          {t("profile.changePassword.form.submit")}
        </Button>
      </KeyboardAwareScrollView>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  forgotPassword: {
    marginBottom: 24,
    textAlign: "right",
  },
})
