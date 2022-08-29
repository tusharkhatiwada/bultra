import * as Font from "expo-font"
import * as Localization from "expo-localization"
import * as SplashScreen from "expo-splash-screen"

import { StorageKey, createSecureStorage } from "services/SecureStorage"
import { useEffect, useState } from "react"

import { FontAwesome5 } from "@expo/vector-icons"
import { changeLanguage } from "i18next"

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

  useEffect(() => {
    const setLanguage = async () => {
      const storage = createSecureStorage()
      const language = await storage.get(StorageKey.LANGUAGE)

      if (language) {
        changeLanguage(language)
        return
      }

      if (Localization.locale.includes("es")) {
        storage.set(StorageKey.LANGUAGE, "es-ES")
        return
      }

      storage.set(StorageKey.LANGUAGE, "en-GB")
      return
    }

    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        await Font.loadAsync({
          ...FontAwesome5.font,
          ...fonts,
        })

        await setLanguage()
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
