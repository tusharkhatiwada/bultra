import { Logout, LogoutProps } from "./Logout"
import { authContext, fireEvent, render, waitFor } from "tests/app-tests-utils"

const props = {} as LogoutProps

describe("Logout", () => {
  it("can log out", async () => {
    const { getAllByText } = await render(<Logout {...props} />)

    const [logoutButton, logoutConfirmButton] = getAllByText("profile.logout.title")

    fireEvent.press(logoutButton)
    fireEvent.press(logoutConfirmButton)

    await waitFor(() => {
      expect(authContext.logout).toHaveBeenCalled()
    })
  })
})
