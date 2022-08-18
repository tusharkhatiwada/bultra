import { AxiosInstance, AxiosResponse } from "axios"

import { CreateAccount } from "api/domain/auth"

export const createCreateAccountHttp =
  (client: AxiosInstance): CreateAccount.Request =>
  async ({ email, password, referralId }) => {
    const { data }: AxiosResponse<string> = await client.post("/v1/auth/create-account", {
      email,
      password,
      referralId,
    })

    return data
  }
