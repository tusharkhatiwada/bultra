import * as SecureStore from "expo-secure-store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Platform } from "react-native"

export enum StorageKey {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  USER_EMAIL = "USER_EMAIL",
  HASHED_PASSWORD = "HASHED_PASSWORD",
  USER_ID = "USER_ID",
  USER_TRADING_EMAIL = "USER_TRADING_EMAIL",
  LANGUAGE = "LANGUAGE",
  INITIATE_TRADING = "INITIATE_TRADING",
  TRADING_PAYMENT_COMPLETE = "TRADING_PAYMENT_COMPLETE",
  BOT_ACTIVATED = "BOT_ACTIVATED",
  BOT_RUNNING = "BOT_RUNNING",
  BOT_KEY = "BOT_KEY",
  BOT_SECRET = "BOT_SECRET",
  RISK_LEVEL = "RISK_LEVEL",
}

export interface SecureStorageService {
  get: (key: StorageKey) => Promise<string | null>
  set: (key: StorageKey, value: string) => Promise<void>
  delete: (key: StorageKey) => Promise<void>
}

export const createSecureStorage = (): SecureStorageService => {
  if (Platform.OS === "web") {
    return {
      get: async (key) => await AsyncStorage.getItem(key),
      set: async (key, value) => await AsyncStorage.setItem(key, value),
      delete: async (key) => await AsyncStorage.removeItem(key),
    }
  }
  return {
    get: async (key) => await SecureStore.getItemAsync(key),
    set: async (key, value) => await SecureStore.setItemAsync(key, value),
    delete: async (key) => await SecureStore.deleteItemAsync(key),
  }
}
