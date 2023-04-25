import { AxiosInstance, AxiosResponse } from "axios"
import { RefundRequest } from "../domain/invest"

export const createRefundRequestHttp =
  (client: AxiosInstance): RefundRequest.Request =>
  async ({ deposit }) => {
    const { data }: AxiosResponse<string> = await client.post("contribution/backDeposit", {
      deposit,
    })

    return data
  }
