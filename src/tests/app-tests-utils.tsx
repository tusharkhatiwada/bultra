import "@testing-library/jest-native/extend-expect"

import { AuthContext, AuthContextProps } from "context/AuthContext"
import { FC, ReactElement } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ApiContext } from "context/ApiContext"
import { NativeBaseProvider } from "native-base"
import { NavigationContainer } from "@react-navigation/native"
import { ToastProvider } from "context/ToastContext"
import { createApiFake } from "api/createApiFake"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createTheme } from "styles/theme"
import { render as rtlRender } from "@testing-library/react-native"
import { FreePlanMock } from "../models/Plans"

const Stack = createNativeStackNavigator()

type customRenderOptions = {
  routeParams?: never
  darkMode?: boolean
  isLoggedIn?: boolean
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

const authContext = {
  token: "stateToken",
  setToken: jest.fn(),
  isLoggedIn: true,
  logout: jest.fn(() => Promise.resolve()),
  selectedPlan: FreePlanMock,
  setSelectedPlan: jest.fn(),
  setUserV2: jest.fn(),
  changeUserPlanLocal: () => {},
} as AuthContextProps

const nativeBaseInsets = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
}

export const customRender = async (
  component: ReactElement<unknown>,
  { routeParams, darkMode = false, isLoggedIn = true, ...renderOptions }: customRenderOptions = {},
) => {
  const theme = createTheme(darkMode ? "dark" : "light")
  // @ts-ignore
  const Wrapper: FC = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <ApiContext.Provider value={api}>
          <AuthContext.Provider value={{ ...authContext, isLoggedIn }}>
            <NativeBaseProvider initialWindowMetrics={nativeBaseInsets} theme={theme}>
              {/*// @ts-ignore*/}
              <ToastProvider>
                <NavigationContainer>
                  <Stack.Navigator>
                    <Stack.Screen name="MockedScreen" initialParams={routeParams}>
                      {() => children}
                    </Stack.Screen>
                  </Stack.Navigator>
                </NavigationContainer>
              </ToastProvider>
            </NativeBaseProvider>
          </AuthContext.Provider>
        </ApiContext.Provider>
      </QueryClientProvider>
    )
  }

  return rtlRender(component, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from "@testing-library/react-native"
// override render method
export { customRender as render, api, authContext }
