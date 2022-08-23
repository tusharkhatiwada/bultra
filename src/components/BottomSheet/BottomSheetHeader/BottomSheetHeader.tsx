import { StyleSheet, TouchableOpacity, View } from "react-native"

import { FC } from "react"
import { FontAwesome5 } from "@expo/vector-icons"
import { Typography } from "components/Typography"
import { useTheme } from "native-base"

export type BottomSheetHeaderProps = {
  title: string
  onClose?: () => void
}

export const BottomSheetHeader: FC<BottomSheetHeaderProps> = ({ title, onClose }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { borderColor: colors.primary[200] }]}>
      <Typography size="small" weight="semibold">
        {title}
      </Typography>

      {onClose && (
        <TouchableOpacity accessibilityRole="button" onPress={onClose}>
          <FontAwesome5 name="times" size={16} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
})
