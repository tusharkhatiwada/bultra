import { AxiosInstance, AxiosResponse } from "axios"

import { GetDataInvest } from "../domain/invest"

export const createGetDataInvestHttp =
  (client: AxiosInstance): GetDataInvest.Request =>
  async () => {
    const { data }: AxiosResponse<GetDataInvest.Response> = await client.get("/invest/dataInvest")

    return data
  }
