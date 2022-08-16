import { AuthNavigator } from "./AuthNavigator"
import { MainNavigator } from "./MainNavigator"
import ModalScreen from "../screens/ModalScreen"
import NotFoundScreen from "../screens/NotFoundScreen"
import { RootStackParamList } from "../models/Navigation"
import { Routes } from "models/Routes"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.main.navigator}
        component={MainNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.auth.navigator}
        component={AuthNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
