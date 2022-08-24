import { AxiosInstance, AxiosResponse } from "axios"

import { ChangePassword } from "api/domain/profile"

export const createChangePasswordHttp =
  (client: AxiosInstance): ChangePassword.Request =>
  async ({ newPassword, oldPassword }) => {
    const { data }: AxiosResponse<string> = await client.post("/v1/auth/change-password", {
      newPassword,
      oldPassword,
    })

    return data
  }
