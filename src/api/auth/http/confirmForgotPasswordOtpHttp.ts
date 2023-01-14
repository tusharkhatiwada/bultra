import { AxiosInstance, AxiosResponse } from "axios"

import { ConfirmForgotPasswordOtp } from "api/domain/auth"

export const confirmForgotPasswordOtpHttp =
  (client: AxiosInstance): ConfirmForgotPasswordOtp.Request =>
    async ({ email, code }) => {
      const { data }: AxiosResponse<ConfirmForgotPasswordOtp.Response> = await client.post("/user/checkCodePasswordRecovery", {
        email,
        code,
      })

      return data
    }
