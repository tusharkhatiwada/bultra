import { AxiosInstance } from "axios"
import { ForgotPassword } from "api/domain/auth"

export const createForgotPasswordHttp =
  (client: AxiosInstance): ForgotPassword.Request =>
  async ({ email }) => {
    await client.post("/v1/auth/forgot-password", {
      email,
    })
  }
