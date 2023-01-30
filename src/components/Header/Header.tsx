import { DeviceEventEmitter, StyleSheet, TouchableOpacity, View } from "react-native"

import { Events } from "models/Events"
import { FC } from "react"
import { Icon } from "components/Icon"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { ParamListBase } from "@react-navigation/native"
import { RootView } from "components/RootView"
import { Typography } from "components/Typography"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { isNil } from "lodash"

export type HeaderProps = {
  navigation: NativeStackNavigationProp<ParamListBase>
  title: string
  canGoBack?: boolean
  onBackPress?: () => void
}

export const Header: FC<HeaderProps> = ({ navigation, title, canGoBack = false, onBackPress }) => {
  const { top } = useSafeAreaInsets()

  const handleGoBack = () => {
    if (!isNil(onBackPress)) {
      onBackPress()
    } else {
      canGoBack ? navigation.goBack() : DeviceEventEmitter.emit(Events.HeaderBackButtonPress)
    }
  }

  return (
    <RootView style={[styles.container, { paddingTop: top + 24 }]}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="go back"
        onPress={handleGoBack}
        style={styles.backButton}
      >
        <Icon name="chevron-left" size="md" />
      </TouchableOpacity>

      <Typography weight="semibold">{title}</Typography>

      <View style={styles.backButton} />
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
})
