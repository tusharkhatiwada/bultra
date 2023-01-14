import { AxiosInstance, AxiosResponse } from "axios"

import { PasswordRecovery } from "api/domain/auth"

export const createPasswordRecoveryHttp =
  (client: AxiosInstance): PasswordRecovery.Request =>
    async ({ email, hash, password }) => {
      const { data }: AxiosResponse<PasswordRecovery.Response> = await client.post("/user/passwordRecovery", {
        email,
        hash,
        password,
      })

      return data
    }
