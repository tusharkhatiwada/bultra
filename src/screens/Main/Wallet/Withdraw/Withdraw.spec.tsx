import { Withdraw, WithdrawProps } from "./Withdraw"
import { api, fireEvent, render, waitFor } from "tests/app-tests-utils"

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  route: {
    params: {
      addressToSend: "",
    },
  },
} as unknown as WithdrawProps

describe("Withdraw", () => {
  it("can send a withdrawal request", async () => {
    jest.spyOn(api.wallet, "withdrawalRequest")
    const { findByLabelText } = await render(<Withdraw {...props} />)

    fireEvent.changeText(await findByLabelText("wallet.withdraw.walletAddress"), "AAAAAAAA")
    fireEvent.changeText(await findByLabelText("wallet.withdraw.amount"), "23.33")
    // fireEvent.changeText(await findByLabelText("wallet.selectNetwork"), "ERC20")
    fireEvent.press(await findByLabelText("wallet.withdraw.cta"))

    await waitFor(() => {
      expect(api.wallet.withdrawalRequest).toHaveBeenCalledWith({
        blockchain: "",
        token: "USDT",
        amount: 23.33,
        addressTo: "AAAAAAAA",
      })
    })
  })

  // it("navigates to KYC form if amount is greater than 1BTC", async () => {
  //   const { getByLabelText } = await render(<Withdraw {...props} />)
  //
  //   fireEvent.changeText(getByLabelText("wallet.withdraw.walletAddress"), "AAAAAAAA")
  //   fireEvent.changeText(getByLabelText("wallet.withdraw.amount"), "20000")
  //   fireEvent.changeText(getByLabelText("wallet.withdraw.token"), "TEST")
  //   fireEvent.changeText(getByLabelText("wallet.withdraw.network"), "BTC")
  //   fireEvent.press(getByLabelText("wallet.withdraw.goToKYCForm"))
  //
  //   await waitFor(() => {
  //     expect(props.navigation.navigate).toHaveBeenCalledWith(Routes.auth.navigator, {
  //       screen: Routes.auth.kyc,
  //       params: {
  //         blockchain: "BTC",
  //         amount: 20000,
  //         token: "TEST",
  //         addressTo: "AAAAAAAA",
  //       },
  //     })
  //   })
  // })
})
