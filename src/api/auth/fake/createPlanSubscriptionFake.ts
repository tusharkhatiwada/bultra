import { PlanSubscription } from "api/domain/auth"
import { FreePlanMock } from "../../../models/Plans"

export const createPlanSubscriptionFake = (): PlanSubscription.Request => () => {
  const createGetPlansFakeFixture = (): PlanSubscription.Response => {
    return {
      email: "test",
      id: "test",
      status: "test",
      Plan: FreePlanMock,
    }
  }
  return Promise.resolve(createGetPlansFakeFixture())
}
