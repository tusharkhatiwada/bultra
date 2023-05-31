import * as Font from "expo-font"
import * as Localization from "expo-localization"
import * as SplashScreen from "expo-splash-screen"

import { StorageKey, createSecureStorage } from "services/SecureStorage"
import { useEffect, useState } from "react"

import { FontAwesome5 } from "@expo/vector-icons"
import { changeLanguage } from "i18next"

const fonts = {
  "Canaro-Light": require("assets/fonts/Canaro-Light.ttf"),
  "Canaro-LightItalic": require("assets/fonts/Canaro-LightItalic.ttf"),
  "Canaro-Book": require("assets/fonts/Canaro-Book.ttf"),
  "Canaro-Italic": require("assets/fonts/Canaro-BookItalic.ttf"),
  "Canaro-Medium": require("assets/fonts/Canaro-Medium.ttf"),
  "Canaro-MediumItalic": require("assets/fonts/Canaro-MediumItalic.ttf"),
  "Canaro-Bold": require("assets/fonts/Canaro-Bold.ttf"),
  "Canaro-BoldItalic": require("assets/fonts/Canaro-BoldItalic.ttf"),
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
