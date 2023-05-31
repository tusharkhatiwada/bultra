import * as SecureStore from "expo-secure-store"

export enum StorageKey {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  USER_EMAIL = "USER_EMAIL",
  LANGUAGE = "LANGUAGE",
  INITIATE_TRADING = "INITIATE_TRADING",
  TRADING_PAYMENT_COMPLETE = "TRADING_PAYMENT_COMPLETE",
  BOT_ACTIVATED = "BOT_ACTIVATED",
}

export interface SecureStorageService {
  get: (key: StorageKey) => Promise<string | null>
  set: (key: StorageKey, value: string) => Promise<void>
  delete: (key: StorageKey) => Promise<void>
}

export const createSecureStorage = (): SecureStorageService => {
  return {
    get: async (key) => await SecureStore.getItemAsync(key),
    set: async (key, value) => await SecureStore.setItemAsync(key, value),
    delete: async (key) => await SecureStore.deleteItemAsync(key),
  }
}
