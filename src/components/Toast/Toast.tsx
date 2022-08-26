import { Container, useTheme } from "native-base"
import { Pressable, StyleSheet, View } from "react-native"

import { FC } from "react"
import { Icon } from "components/Icon"
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
        <Icon name={statusToIconName[status]} color={colors.primary[700]} />
      </Container>
      <Container style={styles.textContainer}>
        <Typography weight="semibold">{title}</Typography>
        <Typography size="small" style={styles.description}>
          {description}
        </Typography>
      </Container>
      <Container style={styles.closeButtonContainer}>
        <Pressable
          accessibilityLabel={t("common.toast.close")}
          accessibilityRole="button"
          onPress={() => onClose(id)}
        >
          <Icon name="times" color={colors.primary[700]} />
        </Pressable>
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
    marginTop: 2,
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
  description: {
    marginTop: 8,
  },
})
