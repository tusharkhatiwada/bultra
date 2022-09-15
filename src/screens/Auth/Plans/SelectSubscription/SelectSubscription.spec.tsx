import * as Clipboard from "expo-clipboard"

import { SelectSubscription, SelectSubscriptionProps } from "./SelectSubscription"
import { fireEvent, render, waitFor } from "tests/app-tests-utils"

import { NetworkTypes } from "models/Networks"
import { PlanTypes } from "models/Plans"

const props = {
  selectedPlan: PlanTypes.PREMIUM,
  selectedNetwork: NetworkTypes.BNB_SMART_CHAIN,
  setSelectedNetwork: jest.fn(),
} as SelectSubscriptionProps

describe("SelectSubscription", () => {
  it("can copy the walletID", async () => {
    const clipboardSpy = jest.spyOn(Clipboard, "setStringAsync")

    const { findByLabelText } = await render(<SelectSubscription {...props} />)

    fireEvent.press(await findByLabelText("plans.selectSubscription.deposit.copy-button"))

    await waitFor(() => {
      expect(clipboardSpy).toHaveBeenCalledWith("FG2022-OF93PP001XT0993AR")
    })
  })
})
