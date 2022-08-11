import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ApiProvider } from "context/ApiContext"
import { StatusBar } from "expo-status-bar"
import { NativeBaseProvider } from "native-base"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { createTheme } from "styles/theme"
import useCachedResources from "./src/hooks/useCachedResources"
import useColorScheme from "./src/hooks/useColorScheme"
import Navigation from "./src/navigation/NavigationContainer"

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

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <ApiProvider>
          <SafeAreaProvider>
            <NativeBaseProvider theme={createTheme(colorScheme)}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </NativeBaseProvider>
          </SafeAreaProvider>
        </ApiProvider>
      </QueryClientProvider>
    )
  }
}
