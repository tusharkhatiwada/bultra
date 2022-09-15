import * as React from "react"

import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"

import { ColorSchemeName } from "react-native"
import LinkingConfiguration from "./LinkingConfiguration"
import { RootNavigator } from "./RootNavigator"

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const isDarkTheme = colorScheme === "dark"

  const theme = isDarkTheme ? DarkTheme : DefaultTheme
  const background = isDarkTheme ? "black" : "white"

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          background,
        },
      }}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}
