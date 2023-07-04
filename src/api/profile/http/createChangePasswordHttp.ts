import { AxiosInstance, AxiosResponse } from "axios"

import { ChangePassword } from "api/domain/profile"

export const createChangePasswordHttp =
  (client: AxiosInstance): ChangePassword.Request =>
  async ({ email_address, hashed_password }) => {
    const { data }: AxiosResponse<ChangePassword.Response> = await client.post("password", {
      email_address,
      hashed_password,
    })

    return data
  }
