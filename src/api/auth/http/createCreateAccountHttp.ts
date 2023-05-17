import { AxiosInstance, AxiosResponse } from "axios"

import { CreateAccount } from "api/domain/auth"

export const createCreateAccountHttp =
  (client: AxiosInstance): CreateAccount.Request =>
  async ({ email, password, ref }) => {
    const { data }: AxiosResponse<CreateAccount.Response> = await client.post("/user/signUp", {
      email,
      password,
      ref,
    })

    return data
  }
