import { AxiosInstance, AxiosResponse } from "axios"

import { StopBot } from "api/domain/trade"

export const stopBotHttp =
  (client: AxiosInstance): StopBot.Request =>
  async ({ key, secret, user_id }) => {
    const { data }: AxiosResponse<StopBot.Response> = await client.post("stop", {
      key,
      secret,
      user_id,
    })

    return data
  }
