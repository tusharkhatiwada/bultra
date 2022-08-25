import { fireEvent, render } from "tests/app-tests-utils"

import { PlanTypes } from "models/Plans"
import { SelectPlan } from "./SelectPlan"

const setSelectedPlan = jest.fn()

describe("SelectPlan", () => {
  it("can select a different plan", async () => {
    const { getAllByRole } = await render(
      <SelectPlan selectedPlan={PlanTypes.PREMIUM} setSelectedPlan={setSelectedPlan} />,
    )

    const [basicPlan] = getAllByRole("radio")

    fireEvent.press(basicPlan)

    expect(setSelectedPlan).toHaveBeenCalledWith(PlanTypes.BASIC)
  })
})