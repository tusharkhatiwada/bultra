import { AxiosInstance, AxiosResponse } from "axios"

import { GetPlans } from "../../domain/auth"

export const createGetPlansHttp =
  (client: AxiosInstance): GetPlans.Request =>
  async () => {
    const { data }: AxiosResponse<GetPlans.Response> = await client.get("/plan")

    return data
  }
