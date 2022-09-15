import * as Clipboard from "expo-clipboard"

import {
  DateFilterToDateRange,
  DateFilterValue,
  dateFilterButtons,
} from "components/ButtonBar/constants/DateFilterButtons"
import { FC, useState } from "react"
import { Pressable, ScrollView, Share, StyleSheet, View } from "react-native"
import { Spinner, Stack, useTheme } from "native-base"

import { ButtonBar } from "components/ButtonBar"
import { DateRange } from "models/Date"
import { Icon } from "components/Icon"
import { MainTabScreenProps } from "models/Navigation"
import { ReferralLevel } from "./ReferralLevel"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { TextInput } from "components/TextInput"
import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { getThisMonthRange } from "utils/date"
import { useFetchReferralLevels } from "hooks/referral/useFetchReferralLevels"
import { useGetUserProfile } from "hooks/profile/useGetUserProfile"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useToastContext } from "context/ToastContext"
import { useTranslation } from "react-i18next"

export type ReferralsProps = MainTabScreenProps<typeof Routes.main.referrals>

export const Referrals: FC<ReferralsProps> = () => {
  const { colors, space } = useTheme()
  const { top } = useSafeAreaInsets()
  const { showToast } = useToastContext()

  const { userProfile } = useGetUserProfile()
  const referralId = userProfile?.referralId || ""

  const [historyDateRange, setHistoryDateRange] = useState<DateRange>(getThisMonthRange())
  const { referralLevels } = useFetchReferralLevels(historyDateRange)

  const { t } = useTranslation()

  const handleCopyReferralId = async () => {
    await Clipboard.setStringAsync(referralId).then(() => {
      showToast({
        type: ToastType.info,
        title: referralId,
        description: t("referrals.copyReferralId"),
      })
    })
  }

  const handleShareReferralId = async () => {
    try {
      await Share.share({
        message: t("referrals.shareMessage", { referralId: referralId }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onDateRangeChange = (value: string) => {
    const result = DateFilterToDateRange[value as DateFilterValue]
    setHistoryDateRange(result)
  }

  if (!referralLevels) {
    return (
      <View style={[styles.container, styles.alignCenter]}>
        <Spinner />
      </View>
    )
  }

  return (
    <ScrollView>
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

        <ButtonBar
          onChange={onDateRangeChange}
          buttons={dateFilterButtons}
          defaultValue={"THIS_MONTH"}
        />

        {referralLevels.map((level, index) => (
          <ReferralLevel key={index} level={level} />
        ))}
      </RootView>
    </ScrollView>
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
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
})
