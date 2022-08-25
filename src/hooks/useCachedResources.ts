import * as Font from "expo-font"
import * as SplashScreen from "expo-splash-screen"

import { useEffect, useState } from "react"

import { FontAwesome5 } from "@expo/vector-icons"

const fonts = {
  "Ubuntu-Light": require("assets/fonts/Ubuntu-Light.ttf"),
  "Ubuntu-LightItalic": require("assets/fonts/Ubuntu-LightItalic.ttf"),
  "Ubuntu-Regular": require("assets/fonts/Ubuntu-Regular.ttf"),
  "Ubuntu-Italic": require("assets/fonts/Ubuntu-Italic.ttf"),
  "Ubuntu-Medium": require("assets/fonts/Ubuntu-Medium.ttf"),
  "Ubuntu-MediumItalic": require("assets/fonts/Ubuntu-MediumItalic.ttf"),
  "Ubuntu-Bold": require("assets/fonts/Ubuntu-Bold.ttf"),
  "Ubuntu-BoldItalic": require("assets/fonts/Ubuntu-BoldItalic.ttf"),
}

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome5.font,
          ...fonts,
        })
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setLoadingComplete(true)
        SplashScreen.hideAsync()
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete
}
