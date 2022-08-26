import { PlanTypes, SubscriptionTypes } from "models/Plans"
import { Plans, PlansProps } from "./Plans"
import { api, fireEvent, render, waitFor } from "tests/app-tests-utils"

import { NetworkTypes } from "models/Networks"

const props = {
  navigation: {
    dispatch: jest.fn(),
  },
} as unknown as PlansProps

describe("Plans", () => {
  it("can select a plan", async () => {
    jest.spyOn(api.auth, "planSubscription")

    const { findByText, getAllByRole } = await render(<Plans {...props} />)

    const plans = getAllByRole("radio")
    const vipPlan = plans[2]

    fireEvent.press(vipPlan)

    const continueButton = await findByText("common.continue")
    fireEvent.press(continueButton)

    const finishButton = await findByText("common.finish")
    fireEvent.press(finishButton)

    await waitFor(() => {
      expect(api.auth.planSubscription).toHaveBeenCalledWith({
        type: PlanTypes.VIP,
        subscription: SubscriptionTypes.MONTHLY,
        network: NetworkTypes.BNB_SMART_CHAIN,
      })
    })
  })

  it.todo("can select a subscription")
})
