import { AuthStackParamList } from "../models/Navigation"
import { Login } from "screens/Auth/Login"
import { Routes } from "models/Routes"
import { SignUp } from "screens/Auth/SignUp"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator<AuthStackParamList>()

export function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.auth.login} component={Login} options={{ headerShown: false }} />
      <Stack.Screen name={Routes.auth.signup} component={SignUp} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
