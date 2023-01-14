import { AxiosInstance, AxiosResponse } from "axios"
import { ForgotPassword } from "api/domain/auth"

export const createForgotPasswordHttp =
  (client: AxiosInstance): ForgotPassword.Request =>
    async ({ email }) => {
      const { data }: AxiosResponse<ForgotPassword.Response> = await client.post("/user/sendCode", {
        email,
      })

      return data
    }
