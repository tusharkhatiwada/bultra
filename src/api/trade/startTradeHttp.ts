import { StartTrade } from "api/domain/trade"
import { AxiosInstance, AxiosResponse } from "axios"

export const startTradeHttp =
  (client: AxiosInstance): StartTrade.Request =>
  async ({ email_address }) => {
    const { data }: AxiosResponse<StartTrade.Response> = await client.get(
      `/finish?email_address=${email_address}`,
    )
    return data
  }
