import { FC, useEffect, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { Spinner, useTheme } from "native-base"
import { StorageKey, createSecureStorage } from "services/SecureStorage"

import { Icon } from "components/Icon"
import { ProfileStackScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Select } from "components/Select"
import { Typography } from "components/Typography"
import { changeLanguage } from "i18next"
import { languagesList } from "models/Languages"
import { useAuthContext } from "context/AuthContext"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"

export type ProfileProps = ProfileStackScreenProps<typeof Routes.main.profile.userProfile>

export const Profile: FC<ProfileProps> = ({ navigation }) => {
  const { t } = useTranslation()

  const storage = createSecureStorage()

  const [language, setLanguage] = useState<string | undefined>()

  const { colors, space } = useTheme()
  const { top } = useSafeAreaInsets()

  const { user } = useAuthContext()

  const handleChangeLanguage = (language: string) => {
    changeLanguage(language)
    setLanguage(language)
    storage.set(StorageKey.LANGUAGE, language)
  }

  const goToSupport = async () => {
    navigation.navigate(Routes.main.profile.support)
  }

  const goToChangePassword = async () => {
    navigation.navigate(Routes.main.profile.changePassword)
  }

  const goToLogout = async () => {
    navigation.navigate(Routes.main.profile.logout)
  }

  useEffect(() => {
    const getCurrentLanguage = async () => {
      const language = await storage.get(StorageKey.LANGUAGE)
      language && setLanguage(language)
    }

    getCurrentLanguage()
  }, [])

  if (!user) {
    return (
      <View style={[styles.container, styles.alignCenter]}>
        <Spinner />
      </View>
    )
  }

  return (
    <RootView style={[styles.container, { paddingTop: top + space[6] }]}>
      <View>
        <View style={styles.paddingHorizontal}>
          <Typography size="h3" style={styles.button}>
            {t("profile.title")}
          </Typography>

          {user.name && (
            <Typography size="headline" weight="semibold">
              {user.name}
            </Typography>
          )}

          <Typography color="primary.400" style={styles.button}>
            {user?.email}
          </Typography>
        </View>

        <View style={[styles.separator, { borderColor: colors.primary[200] }]} />

        <View style={styles.paddingHorizontal}>
          <Select
            custom
            label={t("profile.chooseLanguage")}
            bottomLabel={t("profile.chooseLanguage")}
            cta={t("profile.changeLanguage")}
            value={language}
            options={languagesList}
            onChange={handleChangeLanguage}
          />
        </View>
      </View>

      <View>
        <Pressable onPress={goToSupport} style={styles.link}>
          <View style={styles.flexRow}>
            <Icon name="mobile-alt" color={colors.primary[400]} style={styles.icon} />
            <Typography weight="semibold">{t("profile.support.title")}</Typography>
          </View>
          <Icon name="chevron-right" size="md" />
        </Pressable>

        <Pressable onPress={goToChangePassword} style={styles.link}>
          <View style={styles.flexRow}>
            <Icon name="lock" color={colors.primary[400]} style={styles.icon} />
            <Typography weight="semibold">{t("profile.changePassword.title")}</Typography>
          </View>
          <Icon name="chevron-right" size="md" />
        </Pressable>

        <Pressable
          onPress={goToLogout}
          style={[styles.link, styles.logout, { borderColor: colors.primary[200] }]}
        >
          <View style={styles.flexRow}>
            <Icon name="sign-out-alt" color={colors.primary[400]} style={styles.icon} />
            <Typography weight="semibold">{t("profile.logout.title")}</Typography>
          </View>
          <Icon name="chevron-right" size="md" />
        </Pressable>
      </View>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  separator: {
    borderBottomWidth: 1,
    marginBottom: 24,
  },
  button: {
    marginBottom: 24,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
  },
  logout: {
    borderTopWidth: 1,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  paddingHorizontal: {
    paddingHorizontal: 24,
  },
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
})
