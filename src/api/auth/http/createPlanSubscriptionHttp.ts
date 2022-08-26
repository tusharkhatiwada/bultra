import { AxiosInstance } from "axios"
import { PlanSubscription } from "api/domain/auth"

export const createPlanSubscriptionHttp =
  (client: AxiosInstance): PlanSubscription.Request =>
  async ({ type, subscription, network }) => {
    await client.post("/v1/auth/plan-subscription", {
      type,
      subscription,
      network,
    })
  }
