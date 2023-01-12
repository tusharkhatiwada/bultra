import { AxiosInstance, AxiosResponse } from "axios"

import { ResendOtp } from "api/domain/auth"

export const resendOtpHttp =
  (client: AxiosInstance): ResendOtp.Request =>
    async ({ email }) => {
      const { data }: AxiosResponse<ResendOtp.Response> = await client.post("/user/sendCode", {
        email
      })

      return data
    }
