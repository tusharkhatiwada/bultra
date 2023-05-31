import { AxiosInstance, AxiosResponse } from "axios"

import { CreateAccount } from "api/domain/auth"

export const createCreateAccountHttp =
  (client: AxiosInstance): CreateAccount.Request =>
  async ({ email_address, hashed_password }) => {
    console.log("client", client)
    const { data }: AxiosResponse<CreateAccount.Response> = await client.post("/register", {
      email_address,
      hashed_password,
    })

    return data
  }
