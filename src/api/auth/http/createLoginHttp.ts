import { Login } from "api/domain/auth"
import { AxiosInstance, AxiosResponse } from "axios"

export const createLoginHttp =
  (client: AxiosInstance): Login.Request =>
  async ({ email, password }) => {
    const { data }: AxiosResponse<Login.Response> = await client.post("user/signIn", {
      email,
      password,
    })

    return data
  }
