import * as Clipboard from "expo-clipboard"

import { Pressable, ScrollView, Share, StyleSheet } from "react-native"
import { Stack, useTheme } from "native-base"

import { FC } from "react"
import { Icon } from "components/Icon"
import { MainTabScreenProps } from "models/Navigation"
import { ReferralLevel } from "./ReferralLevel"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { TextInput } from "components/TextInput"
import { Typography } from "components/Typography"
import { useFetchReferralLevels } from "hooks/referral/useFetchReferralLevels"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useToast } from "hooks/useToast"
import { useTranslation } from "react-i18next"

export type ReferralsProps = MainTabScreenProps<typeof Routes.main.referrals>

export const Referrals: FC<ReferralsProps> = () => {
  const { colors, space } = useTheme()
  const { top } = useSafeAreaInsets()
  const { toast } = useToast()

  const { referralLevels } = useFetchReferralLevels()
  // TODO: This should come from a hook
  const referralId = "FG - 0922294"

  const { t } = useTranslation()

  const handleCopyReferralId = async () => {
    await Clipboard.setStringAsync(referralId).then(() => {
      toast.info(referralId, t("referrals.copyReferralId"))
    })
  }

  const handleShareReferralId = async () => {
    try {
      await Share.share({
        message: t("referrals.shareMessage", { referralId }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (!referralLevels) return null

  return (
    <RootView style={[styles.container, { paddingTop: top + space[6] }]}>
      <Typography size="h3" style={styles.title}>
        {t("referrals.title")}
      </Typography>

      <Stack space="lg">
        <Typography color="primary.400">{t("referrals.description")}</Typography>

        <TextInput
          isDisabled
          label={t("referrals.referralId")}
          name={t("referrals.referralId")}
          value={referralId}
          InputRightElement={
            <>
              <Pressable
                onPress={handleCopyReferralId}
                style={[styles.icon, { backgroundColor: colors.primary[100] }]}
              >
                <Icon name="copy" />
              </Pressable>
              <Pressable
                onPress={handleShareReferralId}
                style={[styles.icon, { backgroundColor: colors.primary[100] }]}
              >
                <Icon name="share-alt" />
              </Pressable>
            </>
          }
        />
      </Stack>

      <Stack space="lg">
        <Typography size="headline" weight="bold">
          {t("referrals.rewards")}
        </Typography>

        <Typography size="small" color="primary.400" style={styles.title}>
          {t("referrals.rewardsDescription")}
        </Typography>
      </Stack>

      <ScrollView>
        {referralLevels.map((level, index) => (
          <ReferralLevel key={index} level={level} />
        ))}
      </ScrollView>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 16,
  },
  icon: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
})
