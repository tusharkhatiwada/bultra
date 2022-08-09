import { Pressable, StyleSheet, TextInput } from "react-native"
import { Text, View } from "../components/Themed"

import { useLoginForm } from "hooks/useLoginForm"

export default function TabOneScreen() {
  const { getTextFieldProps, handleSubmit } = useLoginForm({
    onSubmit: (values) => {
      console.log(
        "🚀 ~ file: TabOneScreen.tsx ~ line 10 ~ TabOneScreen ~ values",
        values,
      )
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
        <TextInput style={styles.textfield} {...getTextFieldProps("email")} />
      </View>
      <View>
        <Text>Password</Text>

        <TextInput
          style={styles.textfield}
          secureTextEntry
          {...getTextFieldProps("password")}
        />
      </View>
      <Pressable onPress={() => handleSubmit()}>
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
