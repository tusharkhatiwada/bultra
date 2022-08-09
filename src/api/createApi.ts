import axios from "axios"
import { createLoginFake } from "./auth/fake/createLoginFake"
import { createApiFake } from "./createApiFake"
import { Api } from "./domain/api"

export function createApi(offline: boolean): Api {
  if (offline) return createApiFake()

  const httpClient = axios.create({
    baseURL: "https://staging-api-core.fast-growing.com/api",
  })

  httpClient.interceptors.request.use(async function (config) {
    // TODO: Handle token
    const token = "test_token"

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
    },
  }
}
