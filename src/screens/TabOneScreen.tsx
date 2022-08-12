import { Button, View } from "native-base"

import { RootView } from "components/RootView"
import { StyleSheet } from "react-native"
import { TextInput } from "components/TextInput"
import { Typography } from "components/Typography"
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
    <RootView style={styles.container}>
      <Typography size="h1">Tab One</Typography>

      <View style={styles.separator} />

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
    </RootView>
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
