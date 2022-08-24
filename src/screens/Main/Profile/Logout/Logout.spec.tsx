import { Logout, LogoutProps } from "./Logout"
import { authContext, fireEvent, render, waitFor } from "tests/app-tests-utils"

const props = {} as LogoutProps

describe("Logout", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<Logout {...props} />)

    expect(getByText("This is the Logout component!")).toBeTruthy()
  })

  it("can log out", async () => {
    const { getByText } = await render(<Logout {...props} />)

    const logoutButton = getByText("profile.logout")

    fireEvent.press(logoutButton)

    await waitFor(() => {
      expect(authContext.logout).toHaveBeenCalled()
    })
  })
})
