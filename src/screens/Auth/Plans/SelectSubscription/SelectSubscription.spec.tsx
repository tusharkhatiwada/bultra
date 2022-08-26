import * as Clipboard from "expo-clipboard"

import { PlanTypes, SubscriptionTypes } from "models/Plans"
import { SelectSubscription, SelectSubscriptionProps } from "./SelectSubscription"
import { fireEvent, render, waitFor } from "tests/app-tests-utils"

import { NetworkTypes } from "models/Networks"

const props = {
  selectedPlan: PlanTypes.PREMIUM,
  selectedSubscription: SubscriptionTypes.BIENNIAL,
  setSelectedSubscription: jest.fn(),
  selectedNetwork: NetworkTypes.BNB_SMART_CHAIN,
  setSelectedNetwork: jest.fn(),
} as SelectSubscriptionProps

describe("SelectSubscription", () => {
  it("calls setSelectedSubscription on subscription card press", async () => {
    const { getByText } = await render(<SelectSubscription {...props} />)

    fireEvent.press(getByText("plans.selectSubscription.monthly.title"))

    await waitFor(() => {
      expect(props.setSelectedSubscription).toHaveBeenCalledWith(SubscriptionTypes.MONTHLY)
    })
  })

  it("can copy the walletID", async () => {
    const clipboardSpy = jest.spyOn(Clipboard, "setStringAsync")

    const { getByLabelText } = await render(<SelectSubscription {...props} />)

    fireEvent.press(getByLabelText("plans.selectSubscription.deposit.copy-button"))

    await waitFor(() => {
      expect(clipboardSpy).toHaveBeenCalledWith("FG2022-OF93PP001XT0993AR")
    })
  })
})
