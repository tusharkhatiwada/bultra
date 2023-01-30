import { FC } from "react"
import { PlanTypes, Plan, PlanTranslationsTypes } from "models/Plans"
import { Dimensions, Pressable, StyleSheet, View } from "react-native"
import { Trans, useTranslation } from "react-i18next"

import { Icon } from "components/Icon"
import { RootView } from "components/RootView"
import { Typography } from "components/Typography"
import { accentColors } from "styles/colors"
import useColorScheme from "hooks/useColorScheme"

export type PlanCardProps = {
  // type: PlanTypes
  plan: Plan
  goToLogin: (selectedPlanId?: Plan) => void
  // selectPlan: Dispatch<SetStateAction<PlanTypes>>
  // selected?: boolean
}

const typeToAccentColor: { [key: string]: "green" | "blue" | "yellow" } = {
  [PlanTypes.FREE]: "green",
  [PlanTypes.BASIC]: "green",
  [PlanTypes.PREMIUM]: "blue",
  [PlanTypes.VIP]: "yellow",
}

export const PlansSelectorCard: FC<PlanCardProps> = ({ plan, goToLogin }) => {
  const { t } = useTranslation()

  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"

  const handlePress = () => {
    goToLogin(plan)
  }

  const accentColor = accentColors[typeToAccentColor[plan.name]]

  return (
    <Pressable onPress={handlePress}>
      <RootView style={[styles.container, { borderBottomColor: accentColor.dark }]}>
        <View style={styles.rowCenter}>
          <View style={[styles.iconCircle, { backgroundColor: accentColor.dark }]}>
            <Icon size="sm" color="white" name="coins" />
          </View>
          <Typography size="small" weight="bold" color={isDarkMode ? "black" : undefined}>
            {t(`plans.selectPlan.${PlanTranslationsTypes[plan.name as PlanTypes]}`)}
          </Typography>
        </View>

        <View style={styles.bottomRow}>
          <Typography size="small" weight="bold" color={isDarkMode ? "black" : undefined}>
            <Trans
              i18nKey={"plans.selectPlan.price"}
              values={{ price: plan.price }}
              components={{
                small: <Typography size="mini" weight="semibold" style={styles.fee} />,
              }}
            />
          </Typography>
          <Typography
            size="mini"
            color={isDarkMode ? "black" : undefined}
            style={styles.marginLeft}
          >
            <Trans
              i18nKey={"plans.selectPlan.fee"}
              values={{ fee: plan.percent }}
              components={{
                small: <Typography size="mini" color="primary.500" style={styles.fee} />,
              }}
            />
          </Typography>
        </View>
      </RootView>
    </Pressable>
  )
}

const _width = Dimensions.get("screen").width * 0.43

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignSelf: "stretch",
    width: _width,
    height: 60,
    borderRadius: 4,
    borderBottomWidth: 4,
    shadowColor: accentColors.black,

    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: "flex-start",
    justifyContent: "space-between",
    elevation: 12,
  },

  iconCircle: {
    width: 22,
    height: 22,
    marginRight: 4,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  rowCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },

  fee: {
    lineHeight: 26,
  },

  marginLeft: {
    marginLeft: 10,
  },
})
