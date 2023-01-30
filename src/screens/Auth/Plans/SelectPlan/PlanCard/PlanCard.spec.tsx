import { PlanCard } from "./PlanCard"
import { FreePlanMock, PlanTypes } from "models/Plans"
import { accentColors } from "styles/colors"
import { render } from "tests/app-tests-utils"

describe("PlanCard", () => {
  it.each([
    [
      { ...FreePlanMock, name: PlanTypes.FREE },
      {
        borderBottomColor: accentColors.green.dark,
      },
    ],
    [
      { ...FreePlanMock, name: PlanTypes.PREMIUM },
      {
        borderBottomColor: accentColors.blue.dark,
      },
    ],
    [
      { ...FreePlanMock, name: PlanTypes.VIP },
      {
        borderBottomColor: accentColors.yellow.dark,
      },
    ],
  ])("renders the %s type card", async (value, expected) => {
    const { getByTestId } = await render(<PlanCard plan={value} selectPlan={jest.fn} />)

    expect(getByTestId("plan-card")).toHaveStyle(expected)
  })

  it("changes background color on select", async () => {
    const { getByTestId } = await render(
      <PlanCard plan={FreePlanMock} selectPlan={jest.fn} selected />,
    )

    expect(getByTestId("plan-card")).toHaveStyle({ backgroundColor: accentColors.green.light })
  })
})
