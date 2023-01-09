import { StyleSheet, View, TextInput, TextInputKeyPressEventData } from "react-native"
import { isNil } from "lodash"
import { FC, useEffect, useRef, useState } from "react"

const otpInputsCount = 6;

export const OtpInput: FC = () => {
  const [form, setForm] = useState<Record<string, string>>({});
  const inputsRefs = useRef<TextInput[] | null[]>([]);

  useEffect(() => {
    let count = 0;
    while (count < otpInputsCount) {
      form[`CODE${count}`] = '';
      count++;
    }
  }, []);

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value});
  };

  const onBackspaceClick2 = (nativeEvent: TextInputKeyPressEventData, refToFocusIndex: number) => {
    const needToMovePrev = !isNil(refToFocusIndex) && !isNil(inputsRefs.current[refToFocusIndex]) && nativeEvent.key === 'Backspace'

    if(needToMovePrev) {
      inputsRefs.current[refToFocusIndex]?.focus();
    }
  }

  const pasteCode = (code: string) => {
    const codeArray = code.split('');
    const filledCodeObject: Record<string, string> = {};
    const lastInputRef = inputsRefs.current[codeArray.length - 1];

    codeArray.forEach((codeItem, index) => {
      filledCodeObject[`CODE${index}`] = codeItem;
    });
    setForm(filledCodeObject);

    if(!isNil(lastInputRef)) {
      lastInputRef.focus();
    }
  }

  const recordCode2 = (name: string, code: string, inputToFocusIndex: number) => {
    const onlyNumbersCode = code.replace(/[^0-9]/g, '');
    const inputToFocus = inputsRefs.current[inputToFocusIndex];

    if (onlyNumbersCode.length === 1) {
      handleChange(name, onlyNumbersCode);
      if(!isNil(inputToFocus)) {
        inputsRefs.current[inputToFocusIndex]?.focus();
      }
      return;
    }

    if (onlyNumbersCode.length === 2) {
      handleChange(name, onlyNumbersCode[1]);
      if(!isNil(inputToFocus)) {
        inputsRefs.current[inputToFocusIndex]?.focus();
      }
      return;
    }

    if(onlyNumbersCode.length === 6) {
      pasteCode(onlyNumbersCode);
      return;
    }

    handleChange(name, '');
  };
  
  return (
    <View style={styles.codeInputBox}>
      {Array.from(Array(otpInputsCount).keys()).map((index) => {
        const nextInputRefIndex = index + 1;
        const prevInputRefIndex = index - 1;
        const inputName = `CODE${index}`;

        return (
          <TextInput
            key={inputName}
            style={styles.codeInput}
            value={form[inputName]}
            onChangeText={(code) => {
              recordCode2(inputName, code, nextInputRefIndex );
             }}
            onKeyPress={
              ({ nativeEvent }) =>
                onBackspaceClick2(nativeEvent, prevInputRefIndex)
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
  // eslint-disable-next-line react-native/no-color-literals
  codeInput: {
    fontWeight: "bold",
    backgroundColor: "#F7F7F7",
    height: 50,
    width: 40,
    borderRadius: 12,
    color: "#5A5A5A",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderColor: "#F2F4F9",
    borderStyle: "solid",
    borderWidth: 1,
    marginRight: 8,
  },
})
