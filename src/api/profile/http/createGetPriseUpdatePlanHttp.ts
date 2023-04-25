import { AxiosInstance, AxiosResponse } from "axios"

import { GetPriceUpdatePlan } from "../../domain/auth"

export const createGetPriseUpdatePlanHttp =
  (client: AxiosInstance): GetPriceUpdatePlan.Request =>
  async ({ id }) => {
    const { data }: AxiosResponse<GetPriceUpdatePlan.Response> = await client.get(
      "/plan/getPriceUpdatePlan",
      { params: { id } },
    )

    console.log("!!!!!!!!!!!!!!!", data)

    return data
  }
