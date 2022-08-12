import { Button } from "native-base"
import { StyleSheet } from "react-native"
import { TextInput } from "components/TextInput"
import { Typography } from "components/Typography"
import { View } from "../components/Themed"
import { useLogin } from "hooks/auth/useLogin"
import { useLoginForm } from "hooks/auth/useLoginForm"

export default function TabOneScreen() {
  const { login } = useLogin()

  const { getTextFieldProps, handleSubmit, dirty, isValid } = useLoginForm({
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
      <Typography size="h1">Tab One</Typography>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <TextInput label="Email" autoCapitalize="none" {...getTextFieldProps("email")} />
      <TextInput
        type="password"
        label="Password"
        autoCapitalize="none"
        autoComplete="off"
        {...getTextFieldProps("password")}
      />

      <Button
        w="100%"
        accessibilityLabel="submit"
        onPress={() => handleSubmit()}
        disabled={!dirty || !isValid}
        bgColor="black"
      >
        Create account
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})
