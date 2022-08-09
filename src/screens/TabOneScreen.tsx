import { Pressable, StyleSheet, TextInput } from "react-native"
import { Text, View } from "../components/Themed"

import { useLoginForm } from "hooks/auth/useLoginForm"
import { useLogin } from "hooks/auth/useLogin"

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
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View>
        <Text>Email</Text>
        <TextInput
          {...getTextFieldProps("email")}
          accessibilityLabel="email"
          placeholder="email"
          style={styles.textfield}
        />
      </View>
      <View>
        <Text>Password</Text>

        <TextInput
          {...getTextFieldProps("password")}
          secureTextEntry
          accessibilityLabel="password"
          placeholder="password"
          style={styles.textfield}
        />
      </View>
      <Pressable
        accessibilityLabel="submit"
        accessibilityRole="button"
        onPress={() => handleSubmit()}
      >
        <Text>Submit</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  // eslint-disable-next-line react-native/no-color-literals
  textfield: {
    width: "100%",
    backgroundColor: "gray",
    borderRadius: 100,
  },
})
