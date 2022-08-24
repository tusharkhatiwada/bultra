import { FC, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import { FontAwesome5 } from "@expo/vector-icons"
import { ProfileStackScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { Select } from "components/Select"
import { Typography } from "components/Typography"
import { changeLanguage } from "i18next"
import { languagesList } from "models/Languages"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useTranslation } from "react-i18next"

export type ProfileProps = ProfileStackScreenProps<typeof Routes.main.profile.userProfile>

export const Profile: FC<ProfileProps> = ({ navigation }) => {
  const { t } = useTranslation()

  const [language, setLanguage] = useState("en-GB")

  const { colors, space } = useTheme()
  const { top } = useSafeAreaInsets()

  const handleChangeLanguage = (language: string) => {
    changeLanguage(language)
    setLanguage(language)
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

  return (
    <RootView style={[styles.container, { paddingTop: top + space[6] }]}>
      <View>
        <View style={styles.paddingHorizontal}>
          <Typography size="h3" style={styles.button}>
            {t("profile.title")}
          </Typography>

          <Typography size="headline" weight="semibold">
            Eduardo López Rodríguez
          </Typography>
          <Typography color="primary.400" style={styles.button}>
            eduardo90@gmail.com
          </Typography>
        </View>

        <View style={[styles.separator, { borderColor: colors.primary[200] }]} />

        <View style={styles.paddingHorizontal}>
          <Select
            custom
            label={t("profile.chooseLanguage")}
            bottomLabel={t("profile.chooseLanguage")}
            cta={t("profile.changeLanguage")}
            defaultValue={language}
            options={languagesList}
            onChange={handleChangeLanguage}
          />
        </View>
      </View>

      <View>
        <Pressable onPress={goToSupport} style={styles.link}>
          <View style={styles.flexRow}>
            <FontAwesome5 name="mobile-alt" color={colors.primary[400]} style={styles.icon} />
            <Typography weight="semibold">{t("profile.support")}</Typography>
          </View>
          <FontAwesome5 name="chevron-right" />
        </Pressable>

        <Pressable onPress={goToChangePassword} style={styles.link}>
          <View style={styles.flexRow}>
            <FontAwesome5 name="lock" color={colors.primary[400]} style={styles.icon} />
            <Typography weight="semibold">{t("profile.changePassword.title")}</Typography>
          </View>
          <FontAwesome5 name="chevron-right" />
        </Pressable>

        <Pressable
          onPress={goToLogout}
          style={[styles.link, styles.logout, { borderColor: colors.primary[200] }]}
        >
          <View style={styles.flexRow}>
            <FontAwesome5 name="sign-out-alt" color={colors.primary[400]} style={styles.icon} />
            <Typography weight="semibold">{t("profile.logout.title")}</Typography>
          </View>
          <FontAwesome5 name="chevron-right" />
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
    width: 24,
  },
  paddingHorizontal: {
    paddingHorizontal: 24,
  },
})
