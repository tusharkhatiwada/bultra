import { CreateAccount, CreateAccountProps } from "./CreateAccount"
import { api, fireEvent, render, waitFor } from "tests/app-tests-utils"

const props = {} as CreateAccountProps

// describe("CreateAccount", () => {
//   it("calls create account endpoint", async () => {
//     jest.spyOn(api.auth, "createAccount")
//
//     const { getByText } = await render(<CreateAccount {...props} />)
//
//     const emailInput = getByText("createAccount.form.email.label")
//     const referralInput = getByText("createAccount.form.referralId.label")
//     const passwordInput = getByText("createAccount.form.password.label")
//     const repeatPasswordInput = getByText("createAccount.form.repeatPassword.label")
//
//     const button = getByText("createAccount.form.submit")
//
//     fireEvent.changeText(emailInput, "email@gmail.com")
//     fireEvent.changeText(referralInput, "REFERRAL_ID")
//     fireEvent.changeText(passwordInput, "1234")
//     fireEvent.changeText(repeatPasswordInput, "1234")
//
//     fireEvent.press(button)
//
//     await waitFor(() => {
//       expect(api.auth.createAccount).toHaveBeenCalledWith({
//         email: "email@gmail.com",
//         referralId: "REFERRAL_ID",
//         password: "1234",
//       })
//     })
//   })
// })
