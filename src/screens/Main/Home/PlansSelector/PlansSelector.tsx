import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useTranslation } from "react-i18next"
import React, { FC } from "react"

import { RootView } from "components/RootView"
import { Typography } from "../../../../components/Typography"
import { PlansSelectorCard } from "./PlansSelectorCard"
import { GetPlans } from "../../../../api/domain/auth"
import { Plan } from "../../../../models/Plans"
import useColorScheme from "../../../../hooks/useColorScheme"

interface Props {
  plans: GetPlans.Response
  goToLogin: (selectedPlanId?: Plan) => void
}

export const PlansSelector: FC<Props> = ({ plans, goToLogin }) => {
  const { space } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation()
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"

  return (
    <RootView style={[styles.container, { paddingBottom: bottom + space[6] }]}>
      <TouchableOpacity onPress={() => console.log("qwe")} style={styles.infoButton}>
        <Image
          style={styles.infoImage}
          source={require("../../../../assets/images/info-circle.png")}
        />
        <Typography size="body" weight="regular" color={isDarkMode ? "black" : undefined}>
          {t("login.verifyMoments")}
        </Typography>
      </TouchableOpacity>
      <View style={styles.plansContainer}>
        <View style={styles.firstPlansBlock}>
          <PlansSelectorCard plan={plans[0]} goToLogin={goToLogin} />
          <PlansSelectorCard plan={plans[1]} goToLogin={goToLogin} />
        </View>
        <View style={styles.secondPlansBlock}>
          <PlansSelectorCard plan={plans[2]} goToLogin={goToLogin} />
          <PlansSelectorCard plan={plans[3]} goToLogin={goToLogin} />
        </View>
      </View>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 36,
    marginBottom: 30,
  },

  plansContainer: {
    lex: 1,
    flexDirection: "column",
    paddingHorizontal: 5,
  },

  firstPlansBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  secondPlansBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoImage: {
    width: 16,
    height: 16,
    marginRight: 12,
  },

  infoButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 36,
  },
})
