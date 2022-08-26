import { PlanSubscription } from "api/domain/auth"

export const createPlanSubscriptionFake = (): PlanSubscription.Request => () => {
  return Promise.resolve()
}
