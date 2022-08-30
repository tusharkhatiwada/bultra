import { AuthNavigator } from "./AuthNavigator"
import { Home } from "screens/Main/Home"
import { MainNavigator } from "./MainNavigator"
import ModalScreen from "../screens/ModalScreen"
import NotFoundScreen from "../screens/NotFoundScreen"
import { RootStackParamList } from "../models/Navigation"
import { Routes } from "models/Routes"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAuthContext } from "context/AuthContext"

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  const { isLoggedIn } = useAuthContext()

  const initialRouteName = isLoggedIn ? Routes.main.navigator : Routes.home

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ animation: "slide_from_right" }}
    >
      <Stack.Screen name={Routes.home} component={Home} options={{ headerShown: false }} />
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
