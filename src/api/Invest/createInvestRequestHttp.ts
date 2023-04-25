import { AxiosInstance, AxiosResponse } from "axios"
import { InvestRequest } from "../domain/invest"

export const createInvestRequestHttp =
  (client: AxiosInstance): InvestRequest.Request =>
  async ({ deposit }) => {
    const { data }: AxiosResponse<string> = await client.post("/contribution/add", {
      deposit,
    })

    return data
  }
