import { Plans, PlansProps } from "./Plans"
import { api, fireEvent, render, waitFor } from "tests/app-tests-utils"

import { FreePlanMock } from "models/Plans"

const props = {
  navigation: {
    dispatch: jest.fn(),
  },
  route: {
    params: {
      desiredPlan: FreePlanMock,
      step: 1,
    },
  },
} as unknown as PlansProps

describe("Plans", () => {
  it("can select a plan", async () => {
    jest.spyOn(api.auth, "planSubscription")

    const { findByText } = await render(<Plans {...props} />)

    const continueButton = await findByText("common.continue")
    fireEvent.press(continueButton)

    const finishButton = await findByText("common.finish")
    fireEvent.press(finishButton)

    await waitFor(() => {
      expect(api.auth.planSubscription).toHaveBeenCalledWith({
        id: FreePlanMock.id,
      })
    })
  })

  it.todo("can select a subscription")
})
