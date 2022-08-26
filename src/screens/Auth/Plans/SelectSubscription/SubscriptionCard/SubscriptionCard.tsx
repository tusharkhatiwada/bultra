import { Dispatch, FC, SetStateAction } from "react"
import { PlanTypes, Plans, SubscriptionTypes } from "models/Plans"
import { Pressable, StyleSheet, View } from "react-native"
import { Trans, useTranslation } from "react-i18next"

import { RootView } from "components/RootView"
import { Typography } from "components/Typography"
import { accentColors } from "styles/colors"
import useColorScheme from "hooks/useColorScheme"
import { useTheme } from "native-base"

export type PlanCardProps = {
  selectedPlan: PlanTypes
  subscriptionType: SubscriptionTypes
  selectSubscription: Dispatch<SetStateAction<SubscriptionTypes>>
  selected?: boolean
}

export const SubscriptionCard: FC<PlanCardProps> = ({
  selectedPlan,
  selectSubscription,
  subscriptionType,
  selected,
}) => {
  const { t } = useTranslation()
  const { colors } = useTheme()

  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"

  const handlePress = () => {
    selectSubscription(subscriptionType)
  }

  const accentColor = accentColors.blue.dark

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityLabel={t(`plans.selectSubscription.${subscriptionType}.title`)}
      onPress={handlePress}
      style={styles.pressable}
    >
      <RootView
        testID="plan-card"
        style={[styles.container, { borderBottomColor: accentColor }, selected && styles.selected]}
      >
        <View style={[styles.topRow, styles.rowCenter]}>
          <View style={styles.rowCenter}>
            <Typography weight="semibold" color={selected && isDarkMode ? "black" : undefined}>
              {t(`plans.selectSubscription.${subscriptionType}.title`)}
            </Typography>
          </View>

          <View style={[styles.radio, !selected && { borderColor: colors.primary[300] }]}>
            {selected && <View style={styles.circle} />}
          </View>
        </View>

        <Typography
          size="headline"
          weight="bold"
          color={selected && isDarkMode ? "black" : undefined}
        >
          <Trans
            i18nKey={`plans.selectSubscription.${subscriptionType}.price`}
            values={{ price: Plans[selectedPlan].subscription[subscriptionType] }}
            components={{
              small: <Typography color="primary.700" />,
            }}
          />
        </Typography>
        <Typography size="mini" color="primary.400">
          {t(`plans.selectSubscription.${subscriptionType}.billingFrequency`)}
        </Typography>
      </RootView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  container: {
    padding: 12,
    borderRadius: 4,
    borderBottomWidth: 4,

    shadowColor: accentColors.black,

    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 12,
  },
  selected: {
    backgroundColor: accentColors.blue.light,
    shadowOpacity: 0.3,
  },
  topRow: {
    justifyContent: "space-between",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  radio: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 6,
    height: 6,
    borderRadius: 12,
    backgroundColor: accentColors.black,
  },
})
