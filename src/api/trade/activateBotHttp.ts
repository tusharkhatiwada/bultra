import { AxiosInstance, AxiosResponse } from "axios"

import { ActivateBot } from "api/domain/trade"

export const activateBotHttp =
  (client: AxiosInstance): ActivateBot.Request =>
  async ({ key, secret, user_id, email_address, risk_level }) => {
    const { data }: AxiosResponse<ActivateBot.Response> = await client.post("activate", {
      key,
      secret,
      email_address,
      user_id,
      risk_level,
    })

    return data
  }
