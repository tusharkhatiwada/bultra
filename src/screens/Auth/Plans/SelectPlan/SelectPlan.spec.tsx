import { render } from "tests/app-tests-utils"

import { FreePlanMock, PlanTypes } from "models/Plans"
import { SelectPlan } from "./SelectPlan"

const setSelectedPlan = jest.fn()

describe("SelectPlan", () => {
  it("can select a different plan", async () => {
    await render(
      <SelectPlan
        selectedPlan={{ ...FreePlanMock, name: PlanTypes.PREMIUM }}
        setSelectedPlan={setSelectedPlan}
      />,
    )

    setSelectedPlan({ ...FreePlanMock, name: PlanTypes.FREE })

    expect(setSelectedPlan).toHaveBeenCalledWith({ ...FreePlanMock, name: PlanTypes.FREE })
  })
})
