import { FC } from "react"
import { PlanTypes, Plan, PlanTranslationsTypes } from "models/Plans"
import { Dimensions, Pressable, StyleSheet, View, Image } from "react-native"
import { Trans, useTranslation } from "react-i18next"

import { Icon } from "components/Icon"
import { RootView } from "components/RootView"
import { Typography } from "components/Typography"
import { accentColors } from "styles/colors"
import useColorScheme from "hooks/useColorScheme"

export type PlanCardProps = {
  plan: Plan
  goToLogin: (selectedPlanId?: Plan) => void
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
            {plan.name === PlanTypes.FREE || plan.name === PlanTypes.BASIC ? (
              <Image
                style={styles.coinImage}
                source={require("../../../../assets/images/coin.png")}
              />
            ) : (
              <Icon size="md" color="white" name="coins" />
            )}
          </View>
          <Typography size="body" weight="bold" color={isDarkMode ? "black" : undefined}>
            {t(`plans.selectPlan.${PlanTranslationsTypes[plan.name as PlanTypes]}`)}
          </Typography>
        </View>

        <Typography size="body" weight="bold" color={isDarkMode ? "black" : undefined}>
          <Trans
            i18nKey={"plans.selectPlan.fee"}
            values={{ fee: plan.percent }}
            components={{
              small: <Typography size="mini" color="primary.500" style={styles.fee} />,
            }}
          />
        </Typography>

        <View style={styles.bottomRow}>
          {plan.price > 0 ? (
            <Typography size="body" weight="bold" color={isDarkMode ? "black" : undefined}>
              <Trans
                i18nKey={"plans.selectPlan.price"}
                values={{ price: plan.price }}
                components={{
                  small: <Typography style={styles.fee} />,
                }}
              />
            </Typography>
          ) : (
            <Typography size="body" weight="bold" color={isDarkMode ? "black" : undefined}>
              Free
            </Typography>
          )}
        </View>
      </RootView>
    </Pressable>
  )
}

const _width = Dimensions.get("screen").width * 0.6

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 17,
    alignSelf: "stretch",
    width: _width,
    height: 134,
    borderRadius: 4,
    borderBottomWidth: 4,
    shadowColor: accentColors.black,
    marginTop: 10,

    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    alignItems: "flex-start",
    justifyContent: "space-between",
    elevation: 12,
  },

  iconCircle: {
    width: 32,
    height: 22,
    marginRight: 12,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  coinImage: {
    width: 16,
    height: 11,
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
})
