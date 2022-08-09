import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@testing-library/jest-native/extend-expect"
import { render as rtlRender } from "@testing-library/react-native"
import { createApiFake } from "api/createApiFake"
import { ApiContext } from "context/ApiContext"
import { FC, ReactElement } from "react"

const Stack = createNativeStackNavigator()

type customRenderOptions = {
  routeParams?: never
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      retry: false,
    },
  },
})

const api = createApiFake()

export const customRender = async (
  component: ReactElement<unknown>,
  { routeParams, ...renderOptions }: customRenderOptions = {},
) => {
  const Wrapper: FC = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <ApiContext.Provider value={api}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="MockedScreen" initialParams={routeParams}>
                {() => children}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </ApiContext.Provider>
      </QueryClientProvider>
    )
  }

  return rtlRender(component, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from "@testing-library/react-native"
// override render method
export { customRender as render, api }
