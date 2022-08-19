import { AuthStackParamList } from "../models/Navigation"
import { CreateAccount } from "screens/Auth/CreateAccount"
import { Header } from "components/Header"
import { Login } from "screens/Auth/Login"
import { Plans } from "screens/Auth/Plans"
import { Routes } from "models/Routes"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTranslation } from "react-i18next"

const Stack = createNativeStackNavigator<AuthStackParamList>()

export function AuthNavigator() {
  const { t } = useTranslation()

  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.auth.login} component={Login} options={{ headerShown: false }} />
      <Stack.Screen
        name={Routes.auth.create_account}
        component={CreateAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.auth.plans}
        component={Plans}
        options={{
          header: ({ navigation }) => <Header navigation={navigation} title={t("plans.title")} />,
        }}
      />
    </Stack.Navigator>
  )
}
