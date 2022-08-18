import { Profile, ProfileProps } from "./Profile"
import { authContext, fireEvent, render, waitFor } from "tests/app-tests-utils"

const props = {
  navigation: {
    navigate: jest.fn(),
  },
} as unknown as ProfileProps

describe("Profile", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<Profile {...props} />)

    expect(getByText("profile.title")).toBeTruthy()
  })

  it("can log out", async () => {
    const { getByText } = await render(<Profile {...props} />)

    const logoutButton = getByText("profile.logout")

    fireEvent.press(logoutButton)

    await waitFor(() => {
      expect(authContext.logout).toHaveBeenCalled()
    })
  })
})
