import { Login, LoginProps } from "./Login"
import { api, fireEvent, render, waitFor } from "tests/app-tests-utils"

const props = {} as LoginProps

describe("Login", () => {
  it("calls login endpoint", async () => {
    jest.spyOn(api.auth, "login")

    const { getByText } = await render(<Login {...props} />)

    const emailInput = getByText("login.form.email.label")
    const passwordInput = getByText("login.form.password.label")

    const button = getByText("login.form.submit")

    fireEvent.changeText(emailInput, "email@gmail.com")
    fireEvent.changeText(passwordInput, "1234")

    fireEvent.press(button)

    await waitFor(() => {
      expect(api.auth.login).toHaveBeenCalledWith({
        email: "email@gmail.com",
        password: "1234",
      })
    })
  })
})
