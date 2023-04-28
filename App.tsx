import "./src/config/i18n"
import "./src/config/yupLocale"

import { LogBox, View } from "react-native"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ApiProvider } from "context/ApiContext"
import { AuthProvider } from "context/AuthContext"
import { NativeBaseProvider } from "native-base"
import Navigation from "./src/navigation/NavigationContainer"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { ToastProvider } from "context/ToastContext"
import { colors } from "styles/colors"
import { createTheme } from "styles/theme"
import useCachedResources from "./src/hooks/useCachedResources"
import useColorScheme from "./src/hooks/useColorScheme"
import React from "react"

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  })

  LogBox.ignoreLogs(["i18next::pluralResolver"])

  const backgroundColor = colorScheme === "dark" ? colors.black : colors.white

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        {/*// @ts-ignore*/}
        <ApiProvider>
          {/*// @ts-ignore*/}
          <AuthProvider>
            <SafeAreaProvider>
              <NativeBaseProvider theme={createTheme(colorScheme)}>
                {/*// @ts-ignore*/}
                <ToastProvider>
                  <View style={{ backgroundColor }}>
                    <StatusBar
                      translucent
                      backgroundColor={backgroundColor}
                      style={colorScheme === "dark" ? "light" : "dark"}
                    />
                  </View>
                  <Navigation colorScheme={colorScheme} />
                </ToastProvider>
              </NativeBaseProvider>
            </SafeAreaProvider>
          </AuthProvider>
        </ApiProvider>
      </QueryClientProvider>
    )
  }
}
