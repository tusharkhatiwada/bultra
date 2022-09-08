import { Button, HStack, useTheme } from "native-base"
import { FC, useState } from "react"
import { ScrollView, StyleSheet } from "react-native"

import { TranslationKeys } from "models/TranslationKeys"
import { Typography } from "components/Typography"
import { useTranslation } from "react-i18next"

export type ButtonBarElement = {
  label: TranslationKeys
  value: string
}

export type ButtonBarProps = {
  buttons: ButtonBarElement[]
  onChange: (value: string) => void
  defaultValue: string
}

export const ButtonBar: FC<ButtonBarProps> = ({ buttons, onChange }) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<string>(buttons[0].value)
  const { colors } = useTheme()

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <HStack
        space="sm"
        flexDirection="row"
        justifyContent="space-between"
        style={styles.container}
      >
        {buttons.map((button) => (
          <Button
            key={button.label}
            style={[
              styles.button,
              {
                // TODO: Change selected color
                backgroundColor: selected === button.value ? colors.info[500] : colors.primary[100],
              },
            ]}
            onPress={() => {
              onChange(button.value)
              setSelected(button.value)
            }}
          >
            <Typography color={colors.black}>{t(button.label as TranslationKeys)}</Typography>
          </Button>
        ))}
      </HStack>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "scroll",
    marginBottom: 16,
  },
  button: {
    borderRadius: 24,
    paddingHorizontal: 8,
    minWidth: 60,
  },
})
