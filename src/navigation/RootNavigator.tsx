import * as Linking from "expo-linking"

import { useEffect, useState } from "react"

import { AuthNavigator } from "./AuthNavigator"
import { Home } from "screens/Main/Home"
import { MainNavigator } from "./MainNavigator"
import ModalScreen from "../screens/ModalScreen"
import NotFoundScreen from "../screens/NotFoundScreen"
import { RootStackParamList } from "../models/Navigation"
import { Routes } from "models/Routes"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { handleLinkingUrl } from "utils/linking"
import { useAuthContext } from "context/AuthContext"
import { useNavigation } from "@react-navigation/native"
import { TradingNavigator } from "./TradingNavigator"

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  const [deepLinkRoute, setDeepLinkRoute] = useState<string | null>("")

  const { isLoggedIn } = useAuthContext()

  const navigation = useNavigation()

  const initialRouteName = isLoggedIn ? Routes.main.navigator : Routes.home

  useEffect(() => {
    Linking.getInitialURL().then((url) => setDeepLinkRoute(url))

    const event = Linking.addEventListener("url", (url) => handleLinkingUrl(navigation, url))

    return () => event.remove()
  }, [])

  useEffect(() => {
    if (deepLinkRoute) {
      handleLinkingUrl(navigation, deepLinkRoute)
    }
  }, [navigation, deepLinkRoute])

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ animation: "slide_from_right" }}
    >
      {/*@ts-ignore*/}
      <Stack.Screen name={Routes.home} component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name={Routes.main.trading.navigator}
        component={TradingNavigator}
        options={{ headerShown: false }}
      />
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
