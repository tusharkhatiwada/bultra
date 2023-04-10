import * as Localization from "expo-localization"

import en from "locales/en.json"
import es from "locales/es.json"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

export const AVAILABLE_LANGUAGES = ["en-GB", "es-ES"]

export const defaultNS = "en-GB"

export const resources = {
  "en-US": en,
  "en-GB": en,
  es: es,
  "es-ES": es,
  "es-US": es,
} as const

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  fallbackLng: "en-GB",
  lng: Localization.locale,
})

export default i18n
