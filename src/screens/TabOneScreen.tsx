import { Text, View } from "../components/Themed"

import { Button } from "native-base"
import { StyleSheet } from "react-native"
import { TextInput } from "components/TextInput"
import { useLogin } from "hooks/auth/useLogin"
import { useLoginForm } from "hooks/auth/useLoginForm"

export default function TabOneScreen() {
  const { login } = useLogin()

  const { getTextFieldProps, handleSubmit } = useLoginForm({
    onSubmit: (values) => {
      login(values, {
        onSuccess: (response) => {
          console.log("onSuccess", { response })
        },
      })
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <TextInput label="Email" {...getTextFieldProps("email")} />
      </View>
      <View>
        <TextInput type="password" label="Password" {...getTextFieldProps("password")} />
      </View>

      <Button accessibilityLabel="submit" onPress={() => handleSubmit()}>
        Submit
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})
