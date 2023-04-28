import { Actionsheet, Button, ISelectItemProps, useTheme } from "native-base"
import { StyleSheet, View } from "react-native"

import { BottomSheetHeader } from "./BottomSheetHeader"
import { FC } from "react"
import { Typography } from "components/Typography"

export type BottomSheetProps = {
  isOpen: boolean
  closeBottomSheet: () => void
  title?: string
  value?: string
  cta?: string
  onChange?: (value: string) => void
  options?: ISelectItemProps[]
}

export const BottomSheet: FC<BottomSheetProps> = ({
  isOpen,
  closeBottomSheet,
  title,
  value,
  cta,
  options = [],
  onChange,
  // @ts-ignore
  children,
}) => {
  const { colors } = useTheme()

  const isSelected = (option: ISelectItemProps) => option.value === value

  return (
    <Actionsheet isOpen={isOpen} onClose={closeBottomSheet} style={styles.container}>
      <Actionsheet.Content>
        {title && <BottomSheetHeader title={title} onClose={closeBottomSheet} />}

        {options && (
          <View style={styles.item}>
            {options.map((option) => (
              <Actionsheet.Item
                key={option.value}
                onPress={() => onChange?.(option.value)}
                style={isSelected(option) && { backgroundColor: colors.primary[200] }}
              >
                <Typography>{option.label}</Typography>
              </Actionsheet.Item>
            ))}
          </View>
        )}

        <View style={styles.button}>{children}</View>

        {cta && (
          <View style={styles.button}>
            <Button onPress={closeBottomSheet}>{cta}</Button>
          </View>
        )}
      </Actionsheet.Content>
    </Actionsheet>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  item: {
    width: "100%",
  },
  button: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 24,
  },
})
