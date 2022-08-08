import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import "@testing-library/jest-native/extend-expect"
import { render as rtlRender } from "@testing-library/react-native"
import { FC, ReactElement } from "react"

const Stack = createNativeStackNavigator()

type customRenderOptions = {
  routeParams?: never
}

export const customRender = async (
  component: ReactElement<unknown>,
  { routeParams, ...renderOptions }: customRenderOptions = {},
) => {
  const Wrapper: FC = ({ children }) => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MockedScreen" initialParams={routeParams}>
            {() => children}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return rtlRender(component, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from "@testing-library/react-native"
// override render method
export { customRender as render }
