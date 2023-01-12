import { AxiosInstance, AxiosResponse } from "axios"

import { ConfirmOtp } from "api/domain/auth"

export const confirmOtpHttp =
  (client: AxiosInstance): ConfirmOtp.Request =>
    async ({ email, code }) => {
      const { data }: AxiosResponse<ConfirmOtp.Response> = await client.post("/user/confirmSignUp", {
        email,
        code,
      })

      return data
    }
