import { FormControl, ITextAreaProps, TextArea, WarningOutlineIcon } from "native-base"
import { NativeSyntheticEvent, StyleSheet, TextInputFocusEventData } from "react-native"

import { FC } from "react"
import { Typography } from "components/Typography"
import _ from "lodash"

export type TextAreaInputProps = ITextAreaProps & {
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

export const TextAreaInput: FC<TextAreaInputProps> = ({
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

  return (
    <FormControl isInvalid={isError} w="100%" style={styles.container}>
      <Typography accessibilityLabel={label} size="small" style={styles.label}>
        {label}
      </Typography>

      <TextArea
        autoCompleteType="off"
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
