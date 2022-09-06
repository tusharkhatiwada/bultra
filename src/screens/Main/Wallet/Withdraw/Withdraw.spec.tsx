import { Withdraw, WithdrawProps } from "./Withdraw"
import { api, fireEvent, render, waitFor } from "tests/app-tests-utils"

const props = {} as WithdrawProps

describe("Withdraw", () => {
  it("can send a withdrawal request", async () => {
    jest.spyOn(api.wallet, "withdrawalRequest")
    const { getByLabelText } = await render(<Withdraw {...props} />)

    fireEvent.changeText(getByLabelText("wallet.withdraw.walletAddress"), "AAAAAAAA")
    fireEvent.changeText(getByLabelText("wallet.withdraw.amount"), "23.33")
    fireEvent.press(getByLabelText("wallet.withdraw.cta"))

    await waitFor(() => {
      expect(api.wallet.withdrawalRequest).toHaveBeenCalledWith({
        network: "BNB_SMART_CHAIN",
        walletAddress: "AAAAAAAA",
        amount: 23.33,
      })
    })
  })
})
