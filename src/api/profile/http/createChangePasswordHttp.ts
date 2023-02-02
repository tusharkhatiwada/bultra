import { AxiosInstance, AxiosResponse } from "axios"

import { ChangePassword } from "api/domain/profile"

export const createChangePasswordHttp =
  (client: AxiosInstance): ChangePassword.Request =>
  async ({ password, oldPassword }) => {
    const { data }: AxiosResponse<string> = await client.patch("user/changePassword", {
      password,
      oldPassword,
    })

    return data
  }
