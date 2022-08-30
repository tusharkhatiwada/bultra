import Animated, {
  SlideInDown,
  SlideInUp,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { FC, ReactNode } from "react"
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native"

import { Icon } from "components/Icon/Icon"
import { Typography } from "components/Typography"
import { colors } from "styles/colors"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"

export enum ToastType {
  info = "info",
  warning = "warning",
  error = "error",
  success = "success",
}

export type ToastProps = {
  title: string
  description?: ReactNode | string
  type?: ToastType
  onClose?: () => void
  position?: "top" | "bottom"
  duration?: number
  delay?: number
  onPress?: () => void
}

export const Toast: FC<ToastProps> = ({
  title,
  description,
  type = ToastType.info,
  onClose,
  delay = 0,
  position = "top",
  duration = 6000,
  onPress,
}) => {
  const { top, bottom } = useSafeAreaInsets()
  const { colors } = useTheme()

  const progressLineWidth = useSharedValue(0)

  const handleOnProgressComplete = () => {
    onClose?.()
  }

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(progressLineWidth.value, { duration }, () =>
        runOnJS(handleOnProgressComplete)(),
      ),
    }
  })

  const handleOnLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const { width } = nativeEvent.layout
    progressLineWidth.value = width
  }

  const typeMapper = {
    [ToastType.info]: {
      icon: "info-circle",
      primaryColor: colors.info[300],
      secondaryColor: colors.info[300],
      progressColor: colors.info[300],
    },
    [ToastType.warning]: {
      icon: "exclamation-triangle",
      primaryColor: colors.warning[300],
      secondaryColor: colors.warning[300],
      progressColor: colors.warning[300],
    },
    [ToastType.error]: {
      icon: "exclamation-circle",
      primaryColor: colors.error[300],
      secondaryColor: colors.error[300],
      progressColor: colors.error[300],
    },
    [ToastType.success]: {
      icon: "check-circle",
      primaryColor: colors.success[300],
      secondaryColor: colors.success[300],
      progressColor: colors.success[300],
    },
  }

  const positionStyles = position === "top" ? { top: top + 16 } : { bottom: bottom + 16 }

  return (
    <Animated.View
      entering={position === "bottom" ? SlideInDown.delay(delay) : SlideInUp.delay(delay)}
      style={[styles.shadowContainer, positionStyles]}
      onLayout={handleOnLayout}
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.container, { backgroundColor: typeMapper[type].primaryColor }]}>
          <View
            style={[styles.iconContainer, { backgroundColor: typeMapper[type].secondaryColor }]}
          >
            <Icon name={typeMapper[type].icon} color={colors.black} />
          </View>
          <View style={styles.textContainer}>
            <Typography weight="semibold">{title}</Typography>
            {description && <Typography size="small">{description}</Typography>}
          </View>
          <Pressable
            style={styles.closeButton}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="close"
          >
            <Icon name="times" color={colors.primary[700]} />
          </Pressable>
          <Animated.View
            style={[
              styles.progress,
              { backgroundColor: typeMapper[type].progressColor },
              animatedProgressStyle,
            ]}
          />
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  shadowContainer: {
    position: "absolute",
    left: 16,
    right: 16,
  },
  container: {
    flexDirection: "row",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primary[200],
    minHeight: 72,
    padding: 16,
    overflow: "hidden",
  },
  textContainer: {
    marginHorizontal: 16,
    flex: 1,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    marginTop: -3,
    borderRadius: 16,
  },
  closeButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    marginTop: -3,
  },
  progress: {
    height: 2,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
})
