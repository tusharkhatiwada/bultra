import * as Clipboard from "expo-clipboard"

import {
  DateFilterToDateRange,
  DateFilterValue,
  dateFilterButtons,
} from "components/ButtonBar/constants/DateFilterButtons"
import { FC, useEffect, useState } from "react"
import { Pressable, ScrollView, Share, StyleSheet, View } from "react-native"
import { Spinner, Stack, useTheme } from "native-base"

import { ButtonBar } from "components/ButtonBar"
import { DateRange } from "models/Date"
import { Icon } from "components/Icon"
import { MainTabScreenProps, ReferralsStackScreenProps } from "models/Navigation"
import { ReferralLevel } from "./ReferralLevel"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { TextInput } from "components/TextInput"
import { ToastType } from "components/Toast/Toast"
import { Typography } from "components/Typography"
import { getThisMonthRange } from "utils/date"
import { useFetchReferralLevels } from "hooks/referral/useFetchReferralLevels"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useToastContext } from "context/ToastContext"
import { useTranslation } from "react-i18next"
import { useAuthContext } from "../../../context/AuthContext"
import { ReferralLevelType } from "../../../models/Referrals"
import { useIsFocused } from "@react-navigation/native"

export type ReferralsProps = ReferralsStackScreenProps<typeof Routes.main.referrals.information>

const referralLevels = {
  level1: {
    count: 56,
    balance: 930,
    users: [],
  },
  level2: {
    count: 44,
    balance: 982,
    users: [],
  },
  level3: {
    count: 41,
    balance: 998,
    users: [],
  },
  level4: {
    count: 23,
    balance: 1021,
    users: [],
  },
  level5: {
    count: 32,
    balance: 1230,
    users: [],
  },
}

export const Referrals: FC<ReferralsProps> = ({ navigation }) => {
  const { colors, space } = useTheme()
  const { top } = useSafeAreaInsets()
  const { showToast } = useToastContext()
  const { user } = useAuthContext()
  const isFocused = useIsFocused()

  // const { userProfile } = useGetUserProfile()
  const referralId = ""

  const [historyDateRange, setHistoryDateRange] = useState<DateRange>(getThisMonthRange())
  // const { referralLevels, remove } = useFetchReferralLevels()

  // useEffect(() => {
  //   if (!isFocused) {
  //     remove()
  //   }
  // }, [isFocused])

  const { t } = useTranslation()

  const handleCopyReferralId = async () => {
    await Clipboard.setStringAsync(user?.ref ? user?.ref : "").then(() => {
      showToast({
        type: ToastType.info,
        title: user?.ref ? user?.ref : "",
        description: t("referrals.copyReferralId"),
      })
    })
  }

  const handleShareReferralId = async () => {
    try {
      await Share.share({
        message: t("referrals.shareMessage", { referralId: user?.ref ? user?.ref : "" }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const goToLevelDetails = (level: ReferralLevelType, levelName: string) => {
    navigation.navigate(Routes.main.referrals.levelDetails, { level, levelName })
  }

  const onDateRangeChange = (value: string) => {
    const result = DateFilterToDateRange[value as DateFilterValue]
    setHistoryDateRange(result)
  }

  // if (!referralLevels) {
  //   return (
  //     <View style={[styles.container, styles.alignCenter]}>
  //       <Spinner />
  //     </View>
  //   )
  // }

  // const getStatus = () => {
  //   if (referralLevels.level3.users.length > 0) {
  //     return "DIAMOND"
  //   }
  //   if (referralLevels.level2.users.length > 0) {
  //     return "EMERALD"
  //   }
  //   if (referralLevels.level1.users.length > 0) {
  //     return "RUBY"
  //   }
  //   return ""
  // }

  // const status = getStatus()

  return (
    <ScrollView>
      <RootView style={[styles.container, { paddingTop: top + space[6] }]}>
        <View style={styles.titleContainer}>
          <Typography size="h3">{t("referrals.title")}</Typography>
          <View style={styles.statusContainer}>
            <Typography size="body">Status:</Typography>
            <View style={styles.referralStatus}>
              <Typography size="mini">DIAMOND</Typography>
            </View>
          </View>
        </View>

        <Stack space="lg">
          <Typography color="primary.400">{t("referrals.description")}</Typography>

          <View style={[styles.refContainer, { backgroundColor: colors.primary[50] }]}>
            <Typography color="primary.400">{user?.ref ? user?.ref : "BF - 0997643"}</Typography>
            <View style={styles.iconsBox}>
              <Pressable
                onPress={handleCopyReferralId}
                style={[styles.icon, { backgroundColor: colors.primary[50] }]}
              >
                <Icon name="copy" />
              </Pressable>
              <Pressable
                onPress={handleShareReferralId}
                style={[styles.icon, { backgroundColor: colors.primary[50] }]}
              >
                <Icon name="share-alt" />
              </Pressable>
            </View>
          </View>

          {/* <TextInput
            isDisabled
            label={t("referrals.referralId")}
            name={t("referrals.referralId")}
            value={user?.ref}
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
          /> */}
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
          defaultValue={"month"}
        />

        <ReferralLevel
          level={referralLevels.level1}
          goToLevelDetails={() => null}
          levelNumber={1}
        />
        <ReferralLevel
          level={referralLevels.level2}
          goToLevelDetails={() => null}
          levelNumber={2}
        />
        <ReferralLevel
          level={referralLevels.level3}
          goToLevelDetails={() => null}
          levelNumber={3}
        />
        <ReferralLevel
          level={referralLevels.level4}
          goToLevelDetails={() => null}
          levelNumber={4}
        />
        <ReferralLevel
          level={referralLevels.level5}
          goToLevelDetails={() => null}
          levelNumber={5}
        />
      </RootView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statusContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  // eslint-disable-next-line react-native/no-color-literals
  referralStatus: {
    borderRadius: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    paddingVertical: 2,
    backgroundColor: "#DBEAFE",
  },
  title: {
    marginBottom: 16,
  },
  iconsBox: {
    flexDirection: "row",
  },
  refContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#D4D4D8",
    borderRadius: 4,
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 8,
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
