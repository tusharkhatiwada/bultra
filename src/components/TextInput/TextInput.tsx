import { FormControl, Input, WarningOutlineIcon } from "native-base"
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native"

import { FC } from "react"

export type TextInputProps = {
  name: string
  label: string
  value: string
  onChangeText: (e: string) => void
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
  value,
  status,
  message,
}) => {
  return (
    <FormControl isInvalid={status === "error"} w="100%">
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        onChangeText={onChangeText}
        onBlur={onBlur}
        isInvalid={status === "error"}
        type={type}
        value={value}
        mx="3"
        placeholder={placeholder}
        w="100%"
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {message}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
