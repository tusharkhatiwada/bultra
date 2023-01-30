import { GetPlans } from "../../domain/auth"
import { PlanTypes } from "../../../models/Plans"

export const createGetPlansFake = (): GetPlans.Request => () => {
  const createGetPlansFakeFixture = (): GetPlans.Response => {
    return [{ id: "Test", name: PlanTypes.FREE, percent: 15, price: 10 }]
  }
  return Promise.resolve(createGetPlansFakeFixture())
}
