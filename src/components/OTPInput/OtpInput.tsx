import { StyleSheet, Text, TextInput, TextInputKeyPressEventData, View } from "react-native"
import { Input } from "native-base"
import { isNil } from "lodash"
import { FC, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { lightColors } from "../../styles/colors"

const otpInputsOptions = {
  otpInputsCount: 6,
  singleCodeItemLength: 1,
  replaceSingleCodeItemLength: 2,
  pastedCodeLength: 6,
  maxPastedCodeLength: 7,
}

interface Props {
  handleSetOtpItem: (code: string, index: number) => void
  handleSetPastedOtp: (fullCode: string[]) => void
  isError?: boolean
}

export const OtpInput: FC<Props> = ({ handleSetOtpItem, handleSetPastedOtp, isError }) => {
  const [form, setForm] = useState<Record<string, string>>({})
  const inputsRefs = useRef<TextInput[] | null[]>([])
  const { t } = useTranslation()

  const resetForm = () => {
    let count = 0
    const filledCodeObject: Record<string, string> = {}
    while (count < otpInputsOptions.otpInputsCount) {
      filledCodeObject[`CODE${count}`] = ""
      count++
    }
    setForm(filledCodeObject)
  }

  useEffect(() => {
    resetForm()
  }, [])

  const handleChange = (name: string, value: string, currentIndex: number) => {
    setForm({ ...form, [name]: value })
    handleSetOtpItem(value, currentIndex)
  }

  const onBackspaceClick = (nativeEvent: TextInputKeyPressEventData, refToFocusIndex: number) => {
    const needToMovePrev =
      !isNil(refToFocusIndex) &&
      !isNil(inputsRefs.current[refToFocusIndex]) &&
      nativeEvent.key === "Backspace"

    if (needToMovePrev) {
      inputsRefs.current[refToFocusIndex]?.focus()
    }
  }

  const pasteCode = (code: string) => {
    const codeArray = code.split("")
    const filledCodeObject: Record<string, string> = {}
    const lastInputRef = inputsRefs.current[codeArray.length - 1]
    const filledSecretCode: string[] = []

    codeArray.forEach((codeItem, index) => {
      filledCodeObject[`CODE${index}`] = codeItem
      filledSecretCode[index] = codeItem
    })
    setForm(filledCodeObject)
    handleSetPastedOtp(filledSecretCode)

    if (!isNil(lastInputRef)) {
      lastInputRef.focus()
    }
  }

  const recordCode = (
    name: string,
    code: string,
    currentIndex: number,
    inputToFocusIndex: number,
  ) => {
    const onlyNumbersCode = code.replace(/[^0-9]/g, "")
    const inputToFocus = inputsRefs.current[inputToFocusIndex]

    if (onlyNumbersCode.length === otpInputsOptions.singleCodeItemLength) {
      handleChange(name, onlyNumbersCode, currentIndex)
      if (!isNil(inputToFocus)) {
        inputsRefs.current[inputToFocusIndex]?.focus()
      }
      return
    }

    if (onlyNumbersCode.length === otpInputsOptions.replaceSingleCodeItemLength) {
      handleChange(name, onlyNumbersCode[1], currentIndex)
      if (!isNil(inputToFocus)) {
        inputsRefs.current[inputToFocusIndex]?.focus()
      }
      return
    }

    if (onlyNumbersCode.length === otpInputsOptions.pastedCodeLength) {
      resetForm()
      pasteCode(onlyNumbersCode)
      return
    }

    if (onlyNumbersCode.length === otpInputsOptions.maxPastedCodeLength) {
      const codeToPaste = [...onlyNumbersCode]
      codeToPaste.shift()
      resetForm()
      pasteCode(codeToPaste.join(""))
      return
    }

    handleChange(name, "", currentIndex)
  }

  return (
    <View style={styles.container}>
      <View style={styles.codeInputBox}>
        {Array.from(Array(otpInputsOptions.otpInputsCount).keys()).map((index) => {
          const nextInputRefIndex = index + 1
          const prevInputRefIndex = index - 1
          const inputName = `CODE${index}`

          return (
            <Input
              w={45}
              h={55}
              mr={3}
              fontSize={32}
              textAlign="center"
              key={inputName}
              value={form[inputName]}
              onChangeText={(code) => {
                recordCode(inputName, code, index, nextInputRefIndex)
              }}
              onKeyPress={({ nativeEvent }) => onBackspaceClick(nativeEvent, prevInputRefIndex)}
              underlineColorAndroid="transparent"
              keyboardType="phone-pad"
              ref={(el) => (inputsRefs.current[index] = el)}
            />
          )
        })}
      </View>
      {isError && <Text style={styles.errorText}>{t("login.form.otp.error")}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: lightColors.error[400],
    marginTop: 10,
  },
  codeInputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
})
