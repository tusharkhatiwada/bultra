import { ResetPassword, ResetPasswordProps } from "./ResetPassword"
import { api, fireEvent, render, waitFor } from "tests/app-tests-utils"

const props = {
  route: {
    params: {
      token: "resetTokenString",
    },
  },
} as unknown as ResetPasswordProps

describe("ResetPassword", () => {
  it("calls reset password endpoint", async () => {
    jest.spyOn(api.auth, "resetPassword")

    const { getByText } = await render(<ResetPassword {...props} />)

    const passwordInput = getByText("resetPassword.form.password.label")
    const repeatPasswordInput = getByText("resetPassword.form.repeatPassword.label")

    const button = getByText("resetPassword.form.submit")

    fireEvent.changeText(passwordInput, "1234")
    fireEvent.changeText(repeatPasswordInput, "1234")

    fireEvent.press(button)

    await waitFor(() => {
      expect(api.auth.resetPassword).toHaveBeenCalledWith({
        password: "1234",
        token: props.route.params.token,
      })
    })
  })
})
