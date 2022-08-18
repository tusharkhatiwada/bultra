import { AuthStackParamList } from "../models/Navigation"
import { CreateAccount } from "screens/Auth/CreateAccount"
import { Login } from "screens/Auth/Login"
import { Routes } from "models/Routes"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator<AuthStackParamList>()

export function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.auth.login} component={Login} options={{ headerShown: false }} />
      <Stack.Screen
        name={Routes.auth.create_account}
        component={CreateAccount}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
