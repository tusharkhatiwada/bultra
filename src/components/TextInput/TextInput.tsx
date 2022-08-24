import { FC, useState } from "react"
import { FormControl, Icon, IconButton, Input, WarningOutlineIcon } from "native-base"
import { NativeSyntheticEvent, StyleSheet, TextInputFocusEventData } from "react-native"

import { FontAwesome5 } from "@expo/vector-icons"
import { IInputProps } from "native-base/lib/typescript/components/primitives/Input/types"
import { Typography } from "components/Typography"
import _ from "lodash"
import { useTranslation } from "react-i18next"

export type TextInputProps = IInputProps & {
  name: string
  label: string
  value?: string
  onChangeText?: (e: string) => void
  message?: string
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  type?: "text" | "password"
  status?: "error" | "success" | "warning" | "info"
  placeholder?: string
}

export const TextInput: FC<TextInputProps> = ({
  label,
  type = "text",
  placeholder = "",
  onChangeText = () => undefined,
  onBlur = () => undefined,
  value = "",
  status,
  message,
  ...rest
}) => {
  const isError = status === "error"
  const [hidePassword, setHidePassword] = useState<boolean>(true)
  const { t } = useTranslation()

  return (
    <FormControl isInvalid={isError} w="100%" style={styles.container}>
      <Typography accessibilityLabel={label} size="small" style={styles.label}>
        {label}
      </Typography>

      <Input
        isFullWidth
        w="100%"
        size="md"
        onChangeText={onChangeText}
        onBlur={onBlur}
        isInvalid={isError}
        type={type}
        value={value}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={type === "password" ? hidePassword : undefined}
        rightElement={
          type === "password" ? (
            <IconButton
              accessibilityLabel={t("common.textInput.toggleVisibility")}
              onPress={() => setHidePassword(!hidePassword)}
              icon={<Icon size="sm" as={FontAwesome5} name={hidePassword ? "eye-slash" : "eye"} />}
            />
          ) : undefined
        }
        {...rest}
      />

      {isError ? (
        <FormControl.ErrorMessage
          leftIcon={<WarningOutlineIcon size="xs" />}
          style={styles.message}
        >
          {_.capitalize(message)}
        </FormControl.ErrorMessage>
      ) : (
        <FormControl.HelperText style={styles.message}>
          {_.capitalize(message)}
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
  },
  message: {
    minHeight: 18,
  },
})
