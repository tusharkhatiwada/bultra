import { PlanTypes, SubscriptionTypes } from "models/Plans"
import { fireEvent, render, waitFor } from "tests/app-tests-utils"

import { SubscriptionCard } from "./SubscriptionCard"

describe("SubscriptionCard", () => {
  it("displays the default message", async () => {
    const setSelectedSubscriptionMock = jest.fn()

    const { getByText } = await render(
      <SubscriptionCard
        selectSubscription={setSelectedSubscriptionMock}
        selectedPlan={PlanTypes.BASIC}
        subscriptionType={SubscriptionTypes.BIENNIAL}
      />,
    )

    fireEvent.press(getByText("plans.selectSubscription.biennial.title"))

    await waitFor(() => {
      expect(setSelectedSubscriptionMock).toHaveBeenCalledWith(SubscriptionTypes.BIENNIAL)
    })
  })
})
