import { Container, IconButton, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"

import { FC } from "react"
import { FontAwesome5 } from "@expo/vector-icons"
import Layout from "constants/Layout"
import { Typography } from "components/Typography"
import { useTranslation } from "react-i18next"

export type ToastProps = {
  id: string
  status: "error" | "success" | "warning" | "info"
  title: string
  description: string
  onClose: (id: string) => void
}

const statusToIconName = {
  info: "info-circle",
  success: "check-circle",
  warning: "exclamation-triangle",
  error: "exclamation-circle",
}

export const Toast: FC<ToastProps> = ({ title, description, id, onClose, status }) => {
  const width = Layout.window.width - 48
  const { colors } = useTheme()
  const { t } = useTranslation()

  return (
    <View style={{ ...styles.view, backgroundColor: colors[status][300], width }}>
      <Container style={styles.icon}>
        <FontAwesome5 name={statusToIconName[status]} color={colors.primary[700]} size={16} />
      </Container>
      <Container style={styles.textContainer}>
        <Typography bold>{title}</Typography>
        <Typography size="small">{description}</Typography>
      </Container>
      <Container style={styles.closeButtonContainer}>
        <IconButton
          accessibilityLabel={t("common.toast.close")}
          onPress={() => onClose(id)}
          size="xs"
          icon={<FontAwesome5 name="times" size={16} color={colors.primary[700]} />}
        />
      </Container>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  icon: {
    padding: 0,
    margin: 4,
  },
  textContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
  },
  closeButtonContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 0,
  },
})
