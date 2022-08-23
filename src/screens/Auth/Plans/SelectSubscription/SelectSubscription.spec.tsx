import * as Clipboard from "expo-clipboard"

import { PlanTypes, SubscriptionTypes } from "models/Plans"
import { fireEvent, render, waitFor } from "tests/app-tests-utils"

import { SelectSubscription } from "./SelectSubscription"

describe("SelectSubscription", () => {
  it("calls setSelectedSubscription on subscription card press", async () => {
    const setSelectedSubscriptionMock = jest.fn()
    const { getByText } = await render(
      <SelectSubscription
        selectedPlan={PlanTypes.PREMIUM}
        selectedSubscription={SubscriptionTypes.BIENNIAL}
        setSelectedSubscription={setSelectedSubscriptionMock}
      />,
    )

    fireEvent.press(getByText("plans.selectSubscription.monthly.title"))

    await waitFor(() => {
      expect(setSelectedSubscriptionMock).toHaveBeenCalledWith(SubscriptionTypes.MONTHLY)
    })
  })

  it("can copy the walletID", async () => {
    const clipboardSpy = jest.spyOn(Clipboard, "setStringAsync")

    const { getByLabelText } = await render(
      <SelectSubscription
        selectedPlan={PlanTypes.PREMIUM}
        selectedSubscription={SubscriptionTypes.BIENNIAL}
        setSelectedSubscription={() => undefined}
      />,
    )

    fireEvent.press(getByLabelText("plans.selectSubscription.deposit.copy-button"))

    await waitFor(() => {
      expect(clipboardSpy).toHaveBeenCalledWith("FG2022-OF93PP001XT0993AR")
    })
  })
})
