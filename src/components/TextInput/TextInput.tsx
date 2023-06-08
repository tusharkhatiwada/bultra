import { FC, useState } from "react"
import { FormControl, Input, View, WarningOutlineIcon, useTheme } from "native-base"
import { Icon, IconProps } from "components/Icon/Icon"
import { NativeSyntheticEvent, Pressable, StyleSheet, TextInputFocusEventData } from "react-native"

import { IInputProps } from "native-base/lib/typescript/components/primitives/Input/types"
import { Typography } from "components/Typography"
import _ from "lodash"
import { accentColors } from "styles/colors"
import { useTranslation } from "react-i18next"

export type TextInputProps = Omit<IInputProps, "rightElement" | "leftElement"> & {
  name: string
  label: string
  value?: string
  onChangeText?: (e: string) => void
  message?: string
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  type?: "text" | "password"
  status?: "error" | "success" | "warning" | "info"
  placeholder?: string
  leftIcon?: IconProps["name"]
  rightIcon?: IconProps["name"]
  iconLabel?: string
  onIconPress?: () => void
}

export const TextInput: FC<TextInputProps> = ({
  label,
  type = "text",
  placeholder = "",
  onChangeText = () => undefined,
  onBlur = () => undefined,
  onIconPress,
  value = "",
  status,
  message,
  isDisabled,
  leftIcon,
  rightIcon,
  iconLabel,
  ...rest
}) => {
  const isError = status === "error"
  const [hidePassword, setHidePassword] = useState<boolean>(true)
  const { t } = useTranslation()
  const { colors } = useTheme()

  const InputIcon = ({ name }: { name: IconProps["name"] }) => (
    <View style={[styles.icon, isDisabled && { backgroundColor: colors.coolGray[200] }]}>
      <Icon name={name} />
    </View>
  )

  const PasswordButton = () => (
    <Pressable
      accessibilityLabel={iconLabel}
      accessibilityRole="button"
      onPress={() => setHidePassword(!hidePassword)}
      style={styles.passwordButton}
    >
      <Icon name={hidePassword ? "eye-slash" : "eye"} />
    </Pressable>
  )

  const PressableIcon = ({ name }: { name: IconProps["name"] }) => (
    <Pressable
      accessibilityLabel={t("plans.selectSubscription.deposit.copy-button")}
      accessibilityRole="button"
      onPress={onIconPress}
      style={styles.iconButton}
    >
      <InputIcon name={name} />
    </Pressable>
  )

  const getIconElement = ({ name }: { name?: IconProps["name"] }) => {
    if (onIconPress && name) return <PressableIcon name={name} />
    if (!onIconPress && name) return <InputIcon name={name} />

    return undefined
  }

  return (
    <FormControl isInvalid={isError} w="100%" style={styles.container}>
      <Typography accessibilityLabel={label} size="small" style={styles.label}>
        {label}
      </Typography>

      <Input
        variant="underlined"
        isFullWidth
        isDisabled={isDisabled}
        w="100%"
        size="md"
        onChangeText={onChangeText}
        onBlur={onBlur}
        isInvalid={isError}
        type={type}
        value={value}
        placeholder={placeholder}
        style={styles.input}
        selectionColor={accentColors.blue.dark}
        secureTextEntry={type === "password" ? hidePassword : undefined}
        leftElement={getIconElement({ name: leftIcon })}
        rightElement={
          type === "password" ? <PasswordButton /> : getIconElement({ name: rightIcon })
        }
        _disabled={{
          opacity: 1,
          style: [
            styles.input,
            {
              backgroundColor: colors.coolGray[200],
              color: colors.primary[400],
            },
          ],
        }}
        {...rest}
      />

      {isError ? (
        <FormControl.ErrorMessage
          leftIcon={<WarningOutlineIcon size="xs" />}
          style={styles.message}
        >
          {/*{_.capitalize(message)}*/}
          {message}
        </FormControl.ErrorMessage>
      ) : (
        <FormControl.HelperText style={styles.message}>
          {/*{_.capitalize(message)}*/}
          {message}
        </FormControl.HelperText>
      )}
    </FormControl>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    height: 46,
    paddingLeft: 8,
    paddingRight: 8,
  },
  message: {
    minHeight: 18,
  },
  icon: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  iconButton: {
    height: "100%",
    flexDirection: "row",
  },
  passwordButton: {
    paddingHorizontal: 8,
  },
})
