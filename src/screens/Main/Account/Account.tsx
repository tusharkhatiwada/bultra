import { Button } from "components/Button"
import { FC } from "react"
import { MainTabScreenProps } from "models/Navigation"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { StyleSheet } from "react-native"
import { Typography } from "components/Typography"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"

export type AccountProps = MainTabScreenProps<typeof Routes.main.account>

export const Account: FC<AccountProps> = ({ navigation }) => {
  const { space } = useTheme()
  const { top, bottom } = useSafeAreaInsets()

  const goToLogin = () => {
    navigation.navigate(Routes.auth.navigator, {
      screen: Routes.auth.login,
    })
  }

  const goToSignUp = () => {
    navigation.navigate(Routes.auth.navigator, {
      screen: Routes.auth.signup,
    })
  }

  return (
    <RootView
      style={[
        styles.container,
        {
          paddingHorizontal: space[6],
          paddingTop: top + space[6],
          paddingBottom: bottom + space[6],
        },
      ]}
    >
      <Typography size="h3" style={styles.button}>
        Account
      </Typography>

      <Button onPress={goToLogin} style={styles.button}>
        Login
      </Button>
      <Button onPress={goToSignUp} style={styles.button}>
        Sign up
      </Button>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  button: {
    marginBottom: 24,
  },
})
