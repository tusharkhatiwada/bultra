import { AxiosInstance } from "axios"
import { ResetPassword } from "api/domain/auth"

export const createResetPasswordHttp =
  (client: AxiosInstance): ResetPassword.Request =>
  async ({ password, token }) => {
    await client.post(
      "/v1/auth/reset-password",
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  }
