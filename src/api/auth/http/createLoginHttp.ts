import { Login } from "api/domain/auth"
import { AxiosInstance, AxiosResponse } from "axios"

export const createLoginHttp =
  (client: AxiosInstance): Login.Request =>
  async ({ email, password }) => {
    const { data }: AxiosResponse<string> = await client.post(
      "/v1/auth/login",
      {
        email,
        password,
      },
    )

    return data
  }
