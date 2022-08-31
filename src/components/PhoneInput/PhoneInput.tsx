import * as Localization from "expo-localization"
import * as PhoneInputPrimitive from "react-native-phone-number-input"

import { FC, useRef, useState } from "react"
import { FormControl, WarningOutlineIcon } from "native-base"

import { CountryCode } from "react-native-country-picker-modal"
import { StyleSheet } from "react-native"
import { Typography } from "components/Typography"
import _ from "lodash"
import { colors } from "styles/colors"
import { useTranslation } from "react-i18next"

export const COUNTRY_SELECT_THEME = {
  primaryColor: "#ccc",
  primaryColorVariant: "#eee",
  backgroundColor: "#ffffff",
  fontFamily: "Ubuntu-Regular",
  onBackgroundTextColor: "#000000",
  fontSize: 16,
  filterPlaceholderTextColor: "#aaa",
  activeOpacity: 0.7,
  itemHeight: 48,
}

export type PhoneInputProps = {
  name: string
  label: string
  value?: string
  onChangeText?: (e: string) => void
  onChangeFormattedText?: (e: string) => void
  message?: string
  type?: "text" | "password"
  status?: "error" | "success" | "warning" | "info"
  placeholder?: string
}

export const PhoneInput: FC<PhoneInputProps> = ({
  label,
  placeholder = "",
  onChangeText = () => undefined,
  value = "",
  status,
  message,
}) => {
  const { t } = useTranslation()
  const [invalidMessage, setInValidMessage] = useState<string>("")
  const [phoneWithoutCode, setPhoneWithoutCode] = useState<string>("")
  const isError = status === "error" || invalidMessage !== ""

  const phoneInputRef = useRef<PhoneInputPrimitive.default>(null)

  const isPhoneNumberValid = () => {
    const value = phoneInputRef.current?.props.value
    const prefix = phoneInputRef.current?.getCallingCode()
    if (value === "" || value === prefix) return
    if (!phoneInputRef.current?.isValidNumber(value as string)) {
      setInValidMessage(t("common.phoneInput.invalid"))
    } else {
      setInValidMessage("")
    }
  }

  return (
    <FormControl isInvalid={isError} w="100%" style={styles.container}>
      <Typography accessibilityLabel={label} size="small" style={styles.label}>
        {label}
      </Typography>

      <PhoneInputPrimitive.default
        ref={phoneInputRef}
        placeholder={placeholder || t("common.phoneInput.placeholder")}
        defaultCode={(Localization.region || "US") as CountryCode}
        layout="first"
        textInputStyle={styles.textInput}
        textInputProps={{
          value: phoneWithoutCode,
          onBlur: () => {
            isPhoneNumberValid()
          },
        }}
        codeTextStyle={styles.codeText}
        onChangeText={setPhoneWithoutCode}
        onChangeFormattedText={onChangeText}
        value={value}
        containerStyle={styles.phoneInputContainer}
        textContainerStyle={styles.phoneInput}
        countryPickerProps={{ theme: COUNTRY_SELECT_THEME }}
      />

      {isError ? (
        <FormControl.ErrorMessage
          leftIcon={<WarningOutlineIcon size="xs" />}
          style={styles.message}
        >
          {_.capitalize(invalidMessage ? invalidMessage : message)}
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
  message: {
    minHeight: 18,
  },
  phoneInput: {
    backgroundColor: colors.white,
    height: 48,
  },
  phoneInputContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.primary[300],
    borderRadius: 4,
  },
  textInput: {
    fontFamily: "Ubuntu-Regular",
  },
  codeText: {
    fontFamily: "Ubuntu-Regular",
    height: 48,
    marginTop: 30,
  },
})
