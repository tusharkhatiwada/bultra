import { PlanCard } from "./PlanCard"
import { PlanTypes } from "models/Plans"
import { accentColors } from "styles/colors"
import { render } from "tests/app-tests-utils"

describe("PlanCard", () => {
  it.each([
    [
      PlanTypes.BASIC,
      {
        borderBottomColor: accentColors.green.dark,
      },
    ],
    [
      PlanTypes.PREMIUM,
      {
        borderBottomColor: accentColors.blue.dark,
      },
    ],
    [
      PlanTypes.VIP,
      {
        borderBottomColor: accentColors.yellow.dark,
      },
    ],
  ])("renders the %s type card", async (value, expected) => {
    const { getByTestId } = await render(<PlanCard type={value} selectPlan={jest.fn} />)

    expect(getByTestId("plan-card")).toHaveStyle(expected)
  })

  it("changes background color on select", async () => {
    const { getByTestId } = await render(
      <PlanCard type={PlanTypes.BASIC} selectPlan={jest.fn} selected />,
    )

    expect(getByTestId("plan-card")).toHaveStyle({ backgroundColor: accentColors.green.light })
  })
})
