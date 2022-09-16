import { Profile, ProfileProps } from "./Profile"
import { fireEvent, render } from "tests/app-tests-utils"

import { Routes } from "models/Routes"

const props = {
  navigation: {
    navigate: jest.fn(),
  },
} as unknown as ProfileProps

describe("Profile", () => {
  it("displays the default message", async () => {
    const { findByText } = await render(<Profile {...props} />)

    expect(await findByText("profile.title")).toBeTruthy()
  })

  it("navigates to the support screen", async () => {
    const { findByText } = await render(<Profile {...props} />)

    const link = await findByText("profile.support.title")

    fireEvent.press(link)

    expect(props.navigation.navigate).toHaveBeenCalledWith(Routes.main.profile.support)
  })

  it("navigates to the change password screen", async () => {
    const { findByText } = await render(<Profile {...props} />)

    const link = await findByText("profile.changePassword.title")

    fireEvent.press(link)

    expect(props.navigation.navigate).toHaveBeenCalledWith(Routes.main.profile.changePassword)
  })

  it("navigates to the logout screen", async () => {
    const { findByText } = await render(<Profile {...props} />)

    const link = await findByText("profile.logout.title")

    fireEvent.press(link)

    expect(props.navigation.navigate).toHaveBeenCalledWith(Routes.main.profile.logout)
  })
})
