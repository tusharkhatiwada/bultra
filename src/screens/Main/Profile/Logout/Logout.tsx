import { Stack, useDisclose } from "native-base"

import { BottomSheet } from "components/BottomSheet"
import { Button } from "components/Button"
import { CommonActions } from "@react-navigation/native"
import { FC } from "react"
import { Icon } from "components/Icon"
import { ProfileStackScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { StyleSheet } from "react-native"
import { Typography } from "components/Typography"
import { useAuthContext } from "context/AuthContext"
import { useTranslation } from "react-i18next"

export type LogoutProps = ProfileStackScreenProps<typeof Routes.main.profile.logout>

export const Logout: FC<LogoutProps> = ({ navigation }) => {
  const { logout } = useAuthContext()
  const { isOpen, onOpen, onClose } = useDisclose()
  const { t } = useTranslation()

  const handleLogout = async () => {
    await logout()

    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: Routes.home }] }))
  }

  return (
    <RootView style={styles.container}>
      <Typography color="primary.400">{t("profile.logout.description")}</Typography>

      <Stack space="lg">
        <Button leftIcon={<Icon name="sign-out-alt" size="md" />} onPress={onOpen}>
          {t("profile.logout.title")}
        </Button>

        {/* <Button
          leftIcon={<Icon name="trash-alt" size="md" />}
          variant="outline"
          colorScheme="error"
        >
          {t("profile.logout.deleteAccount")}
        </Button> */}
      </Stack>
      {/*// @ts-ignore*/}
      <BottomSheet
        title={t("profile.logout.logoutConfirm")}
        isOpen={isOpen}
        closeBottomSheet={onClose}
      >
        <Stack space="lg">
          <Button onPress={onClose}>{t("common.goBack")}</Button>

          <Button onPress={handleLogout} variant="outline" colorScheme="error">
            {t("profile.logout.title")}
          </Button>
        </Stack>
      </BottomSheet>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
})
