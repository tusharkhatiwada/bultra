// import { Withdraw, WithdrawProps } from "./Withdraw"
// import { api, fireEvent, render, waitFor } from "tests/app-tests-utils"
//
// import { Routes } from "models/Routes"
//
// const props = {
//   navigation: {
//     navigate: jest.fn(),
//   },
//   route: {
//     params: {
//       addressToSend: "",
//     },
//   },
// } as unknown as WithdrawProps

// describe("Withdraw", () => {
//   it("can send a withdrawal request", async () => {
//     jest.spyOn(api.wallet, "withdrawalRequest")
//     const { findByLabelText, getByText } = await render(<Withdraw {...props} />)
//
//     fireEvent.changeText(await findByLabelText("wallet.withdraw.network"), "BEP20")
//     fireEvent.changeText(await findByLabelText("wallet.withdraw.walletAddress"), "AAAAAAAA")
//     fireEvent.changeText(await findByLabelText("wallet.withdraw.amount"), "0.001")
//     fireEvent.press(await findByLabelText("wallet.withdraw.cta"))
//
//     expect(getByText("wallet.withdraw.network")).toBeTruthy()
//     expect(getByText("wallet.withdraw.walletAddress")).toBeTruthy()
//     expect(getByText("wallet.withdraw.amount")).toBeTruthy()
//
//     // await waitFor(() => {
//     //   expect(api.wallet.withdrawalRequest).toHaveBeenCalledWith({
//     //     blockchain: "BEP20",
//     //     token: "USDT",
//     //     amount: 23.33,
//     //     addressTo: "AAAAAAAA",
//     //   })
//     // })
//   })
//
//   it("navigates to KYC form if amount is greater than 1BTC", async () => {
//     const { getByLabelText, findByLabelText } = await render(<Withdraw {...props} />)
//
//     fireEvent.changeText(await findByLabelText("wallet.withdraw.network"), "BEP20")
//     fireEvent.changeText(await findByLabelText("wallet.withdraw.walletAddress"), "AAAAAAAA")
//     fireEvent.changeText(await findByLabelText("wallet.withdraw.amount"), "20000")
//     fireEvent.press(getByLabelText("wallet.withdraw.goToKYCForm"))
//
//     await waitFor(() => {
//       expect(props.navigation.navigate).toHaveBeenCalledWith(Routes.auth.navigator, {
//         screen: Routes.auth.kyc,
//         params: {
//           amount: 20000,
//           addressTo: "AAAAAAAA",
//           blockchain: "BEP20",
//           token: "USDT",
//         },
//       })
//     })
//   })
// })
