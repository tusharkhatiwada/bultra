import { PlanSubscription } from "api/domain/auth"
import { FreePlanMock } from "../../../models/Plans"

export const createPlanSubscriptionFake = (): PlanSubscription.Request => () => {
  const createGetPlansFakeFixture = (): PlanSubscription.Response => {
    return {
      id: "Test",
      userId: "Test",
      planId: "Test",
      Plan: FreePlanMock,
    }
  }
  return Promise.resolve(createGetPlansFakeFixture())
}
