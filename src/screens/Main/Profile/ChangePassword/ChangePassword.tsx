import { Button, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"

import { FC } from "react"
import { ProfileStackScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { TextInput } from "components/TextInput"
import { useChangePassword } from "hooks/profile/useChangePassword"
import { useChangePasswordForm } from "hooks/profile/useChangePasswordForm"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useToast } from "hooks/useToast"
import { useTranslation } from "react-i18next"

export type ChangePasswordProps = ProfileStackScreenProps<typeof Routes.main.profile.support>

export const ChangePassword: FC<ChangePasswordProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { toast } = useToast()

  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()

  const { changePassword } = useChangePassword()
  const { getTextFieldProps, handleSubmit, dirty, isValid } = useChangePasswordForm({
    onSubmit: ({ oldPassword, newPassword }) => {
      changePassword(
        { oldPassword, newPassword },
        {
          onSuccess: () => {
            toast.success("Success", t("profile.changePassword.form.success"))
            navigation.goBack()
          },
          onError: (err) => toast.error(t("profile.changePassword.form.error"), err.message),
        },
      )
    },
  })

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
      </View>

      <View>
        <Button isDisabled={!isValid || !dirty} onPress={() => handleSubmit()}>
          {t("profile.changePassword.form.submit")}
        </Button>
      </View>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
})
