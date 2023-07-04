import { AxiosInstance, AxiosResponse } from "axios"
import { ForgotPassword } from "api/domain/auth"

export const createForgotPasswordHttp =
  (client: AxiosInstance): ForgotPassword.Request =>
  async ({ email_address, hashed_password }) => {
    const { data }: AxiosResponse<ForgotPassword.Response> = await client.post("password", {
      email_address,
      hashed_password,
    })

    return data
  }
