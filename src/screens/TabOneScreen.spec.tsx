import { api, fireEvent, render, waitFor } from "tests/app-tests-utils"

import TabOneScreen from "./TabOneScreen"

describe("TabOneScreen", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<TabOneScreen />)

    expect(getByText("Tab One")).toBeTruthy()
  })

  it("calls login endpoint", async () => {
    jest.spyOn(api.auth, "login")

    const { getByText, findByRole } = await render(<TabOneScreen />)

    const emailInput = getByText("Email")
    const passwordInput = getByText("Password")

    const button = await findByRole("button")

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
