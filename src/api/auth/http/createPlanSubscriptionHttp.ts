import { AxiosInstance, AxiosResponse } from "axios"
import { PlanSubscription } from "api/domain/auth"

export const createPlanSubscriptionHttp =
  (client: AxiosInstance): PlanSubscription.Request =>
  async ({ id }) => {
    const { data }: AxiosResponse<PlanSubscription.Response> = await client.patch("plan/user", {
      id,
    })

    return data
  }
