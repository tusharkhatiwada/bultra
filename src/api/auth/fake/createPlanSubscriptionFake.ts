import { PlanSubscription } from "api/domain/auth"
import { FreePlanMock } from "../../../models/Plans"

export const createPlanSubscriptionFake = (): PlanSubscription.Request => () => {
  const createGetPlansFakeFixture = (): PlanSubscription.Response => {
    return {
      Transaction: [],
      UserContribution: [],
      UserPlan: { Plan: FreePlanMock, autoUpdate: false, dateTo: "" },
      Wallet: [],
      role: "",
      email: "test",
      id: "test",
      status: "test",
    }
  }
  return Promise.resolve(createGetPlansFakeFixture())
}
