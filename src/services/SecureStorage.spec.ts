import * as SecureStore from "expo-secure-store"

import { StorageKey, createSecureStorage } from "./SecureStorage"

const storage = createSecureStorage()

describe("SecureStorage", () => {
  it("can get access token", async () => {
    jest.spyOn(SecureStore, "getItemAsync")

    storage.get(StorageKey.ACCESS_TOKEN)

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith(StorageKey.ACCESS_TOKEN)
  })

  it("can set access token", async () => {
    jest.spyOn(SecureStore, "setItemAsync")

    storage.set(StorageKey.ACCESS_TOKEN, "token")

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(StorageKey.ACCESS_TOKEN, "token")
  })

  it("can delete access token", async () => {
    jest.spyOn(SecureStore, "deleteItemAsync")

    storage.delete(StorageKey.ACCESS_TOKEN)

    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(StorageKey.ACCESS_TOKEN)
  })
})
