import { StyleSheet, View, TextInput, TextInputKeyPressEventData } from "react-native"
import { Input } from "native-base"
import { isNil } from "lodash"
import { FC, useEffect, useRef, useState } from "react"


const otpInputsCount = 6;

interface Props {
  handleSetOtpItem: (code: string, index: number) => void;
  handleSetPastedOtp: (fullCode: string[]) => void;
}

export const OtpInput: FC<Props> = ({ handleSetOtpItem, handleSetPastedOtp }) => {
  const [form, setForm] = useState<Record<string, string>>({});
  const inputsRefs = useRef<TextInput[] | null[]>([]);

  useEffect(() => {
    let count = 0;
    while (count < otpInputsCount) {
      form[`CODE${count}`] = '';
      count++;
    }
  }, []);

  const handleChange = (name: string, value: string, currentIndex: number) => {
    setForm({ ...form, [name]: value});
    handleSetOtpItem(value, currentIndex);
  }

  const onBackspaceClick = (nativeEvent: TextInputKeyPressEventData, refToFocusIndex: number) => {
    const needToMovePrev = !isNil(refToFocusIndex) && !isNil(inputsRefs.current[refToFocusIndex]) && nativeEvent.key === 'Backspace'

    if(needToMovePrev) {
      inputsRefs.current[refToFocusIndex]?.focus();
    }
  }

  const pasteCode = (code: string) => {
    const codeArray = code.split('');
    const filledCodeObject: Record<string, string> = {};
    const lastInputRef = inputsRefs.current[codeArray.length - 1];
    const filledSecretCode: string[] = [];

    codeArray.forEach((codeItem, index) => {
      filledCodeObject[`CODE${index}`] = codeItem;
      filledSecretCode[index] = codeItem;
    });
    setForm(filledCodeObject);
    handleSetPastedOtp(filledSecretCode);

    if(!isNil(lastInputRef)) {
      lastInputRef.focus();
    }
  }

  const recordCode = (
    name: string,
    code: string,
    currentIndex: number,
    inputToFocusIndex: number) =>
  {
    const onlyNumbersCode = code.replace(/[^0-9]/g, '');
    const inputToFocus = inputsRefs.current[inputToFocusIndex];

    if (onlyNumbersCode.length === 1) {
      handleChange(name, onlyNumbersCode, currentIndex);
      if(!isNil(inputToFocus)) {
        inputsRefs.current[inputToFocusIndex]?.focus();
      }
      return;
    }

    if (onlyNumbersCode.length === 2) {
      handleChange(name, onlyNumbersCode[1], currentIndex);
      if(!isNil(inputToFocus)) {
        inputsRefs.current[inputToFocusIndex]?.focus();
      }
      return;
    }

    if(onlyNumbersCode.length === 6) {
      pasteCode(onlyNumbersCode);
      return;
    }

    handleChange(name, '', currentIndex);
  };

  return (
    <View style={styles.codeInputBox}>
      {Array.from(Array(otpInputsCount).keys()).map((index) => {
        const nextInputRefIndex = index + 1;
        const prevInputRefIndex = index - 1;
        const inputName = `CODE${index}`;

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
              recordCode(inputName, code, index, nextInputRefIndex );
             }}
            onKeyPress={
              ({ nativeEvent }) =>
                onBackspaceClick(nativeEvent, prevInputRefIndex)
            }
            underlineColorAndroid="transparent"
            keyboardType="phone-pad"
            ref={el => inputsRefs.current[index] = el}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  codeInputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
})

