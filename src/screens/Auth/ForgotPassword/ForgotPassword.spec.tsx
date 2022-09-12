import { ForgotPassword, ForgotPasswordProps } from "./ForgotPassword"
import { api, fireEvent, render, waitFor } from "tests/app-tests-utils"

const props = {} as ForgotPasswordProps

describe("ForgotPassword", () => {
  it("calls forgot password endpoint", async () => {
    jest.spyOn(api.auth, "forgotPassword")

    const { getByText } = await render(<ForgotPassword {...props} />)

    const emailInput = getByText("login.form.email.label")

    const button = getByText("forgotPassword.submit")

    fireEvent.changeText(emailInput, "email@gmail.com")

    fireEvent.press(button)

    await waitFor(() => {
      expect(api.auth.forgotPassword).toHaveBeenCalledWith({
        email: "email@gmail.com",
      })
    })
  })
})
