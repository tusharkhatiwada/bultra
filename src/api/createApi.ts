import { StorageKey, createSecureStorage } from "services/SecureStorage"

import { Api } from "./domain/api"
import axios from "axios"
import { createApiFake } from "./createApiFake"
import { createChangePasswordFake } from "./profile/fake/createChangePasswordFake"
import { createCreateAccountFake } from "./auth/fake/createCreateAccountFake"
import { createLoginFake } from "./auth/fake/createLoginFake"
import { createSupportRequestFake } from "./profile/fake/createSupportRequestFake"

export function createApi(offline: boolean): Api {
  if (offline) return createApiFake()

  const httpClient = axios.create({
    baseURL: "https://staging-api-core.fast-growing.com/api",
  })

  const secureStorage = createSecureStorage()

  httpClient.interceptors.request.use(async function (config) {
    const token = await secureStorage.get(StorageKey.ACCESS_TOKEN)

    if (config.headers) {
      if (config.headers.Authorization) return config

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  })

  httpClient.interceptors.response.use(
    (res) => {
      console.info(res.config.url)
      return res
    },
    (error) => {
      const {
        response: { data, config },
      } = error

      const response = {
        data,
        headers: config.headers,
        url: config.url,
      }

      console.error(response)

      throw new Error(error.response.data)
    },
  )

  return {
    auth: {
      login: createLoginFake(),
      createAccount: createCreateAccountFake(),
    },
    profile: {
      changePassword: createChangePasswordFake(),
      supportRequest: createSupportRequestFake(),
    },
  }
}
