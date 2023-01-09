import { StyleSheet, View, TextInput, TextInputKeyPressEventData } from "react-native"
import { isNil } from "lodash"
import { FC, useRef, useState } from "react"

interface FormState {
  CODE1: string;
  CODE2: string;
  CODE3: string;
  CODE4: string;
  CODE5: string;
  CODE6: string;
}

export const OtpInput: FC = () => {
  const [form, setForm] = useState<FormState>({
    CODE1: '',
    CODE2: '',
    CODE3: '',
    CODE4: '',
    CODE5: '',
    CODE6: '',
  });

  const codeInput1 = useRef<TextInput | null>(null);
  const codeInput2 = useRef<TextInput | null>(null);
  const codeInput3 = useRef<TextInput | null>(null);
  const codeInput4 = useRef<TextInput | null>(null);
  const codeInput5 = useRef<TextInput | null>(null);
  const codeInput6 = useRef<TextInput | null>(null);

  const handleChange = (name: keyof FormState, value: string) => {
    setForm({ ...form, [name]: value});
  };

  const onBackspaceClick = (nativeEvent: TextInputKeyPressEventData, refToFocus?: any) => {
    if (!isNil(refToFocus) && nativeEvent.key === 'Backspace'){
      refToFocus.current.focus();
    }
  }

  const pasteCode = (code: string) => {
    setForm({
      CODE1: code[0],
      CODE2: code[1],
      CODE3: code[2],
      CODE4: code[3],
      CODE5: code[4],
      CODE6: code[5],
    })
    if(!isNil(codeInput6.current)) {
      codeInput6.current.focus();
    }
  }

  const recordCode = (name: keyof FormState, code: string, inputToFocus?: any) => {
    const onlyNumbersCode = code.replace(/[^0-9]/g, '');

    if (onlyNumbersCode.length === 1) {
      handleChange(name, onlyNumbersCode);
      if(!isNil(inputToFocus)) {
        inputToFocus.current.focus();
      }
      return;
    }

    if (onlyNumbersCode.length === 2) {
      handleChange(name, onlyNumbersCode[1]);
      if(!isNil(inputToFocus)) {
        inputToFocus.current.focus();
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
      <TextInput
        style={styles.codeInput}
        value={form.CODE1}
        onChangeText={(code) => {
          recordCode('CODE1', code, codeInput2 );
        }}
        onKeyPress={({ nativeEvent }) => onBackspaceClick(nativeEvent)}
        underlineColorAndroid="transparent"
        keyboardType="phone-pad"
        ref={codeInput1}
      />
      <TextInput
        style={styles.codeInput}
        value={form.CODE2}
        onChangeText={(code) => {
          recordCode('CODE2', code, codeInput3 );
        }}
        onKeyPress={({ nativeEvent }) => onBackspaceClick(nativeEvent, codeInput1)}
        underlineColorAndroid="transparent"
        keyboardType="phone-pad"
        ref={codeInput2}
      />
      <TextInput
        style={styles.codeInput}
        value={form.CODE3}
        onChangeText={(code) => {
          recordCode('CODE3', code, codeInput4 );
        }}
        onKeyPress={({ nativeEvent }) => onBackspaceClick(nativeEvent, codeInput2)}
        underlineColorAndroid="transparent"
        keyboardType="phone-pad"
        ref={codeInput3}
      />
      <TextInput
        style={styles.codeInput}
        value={form.CODE4}
        onChangeText={(code) => {
          recordCode('CODE4', code, codeInput5 );
        }}
        onKeyPress={({ nativeEvent }) => onBackspaceClick(nativeEvent, codeInput3)}
        underlineColorAndroid="transparent"
        keyboardType="phone-pad"
        ref={codeInput4}
      />
      <TextInput
        style={styles.codeInput}
        value={form.CODE5}
        onChangeText={(code) => {
          recordCode('CODE5', code, codeInput6 );
        }}
        onKeyPress={({ nativeEvent }) => onBackspaceClick(nativeEvent, codeInput4)}
        underlineColorAndroid="transparent"
        keyboardType="phone-pad"
        ref={codeInput5}
      />
      <TextInput
        style={styles.codeInput}
        value={form.CODE6}
        onChangeText={(code) => {
          recordCode('CODE6', code);
        }}
        onKeyPress={({ nativeEvent }) => onBackspaceClick(nativeEvent, codeInput5)}
        underlineColorAndroid="transparent"
        keyboardType="phone-pad"
        ref={codeInput6}
      />
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
