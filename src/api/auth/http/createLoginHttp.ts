import { Login } from "api/domain/auth"
import { AxiosInstance, AxiosResponse } from "axios"

export const createLoginHttp =
  (client: AxiosInstance): Login.Request =>
  async ({ email_address, hashed_password }) => {
    const { data }: AxiosResponse<Login.Response> = await client.post("login", {
      email_address,
      hashed_password,
    })

    return data
  }
