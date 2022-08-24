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
    const { getByText } = await render(<Profile {...props} />)

    expect(getByText("profile.title")).toBeTruthy()
  })

  it("navigates to the support screen", async () => {
    const { getByText } = await render(<Profile {...props} />)

    const link = getByText("profile.support")

    fireEvent.press(link)

    expect(props.navigation.navigate).toHaveBeenCalledWith(Routes.main.profile.support)
  })

  it("navigates to the change password screen", async () => {
    const { getByText } = await render(<Profile {...props} />)

    const link = getByText("profile.changePassword")

    fireEvent.press(link)

    expect(props.navigation.navigate).toHaveBeenCalledWith(Routes.main.profile.changePassword)
  })

  it("navigates to the logout screen", async () => {
    const { getByText } = await render(<Profile {...props} />)

    const link = getByText("profile.logout.title")

    fireEvent.press(link)

    expect(props.navigation.navigate).toHaveBeenCalledWith(Routes.main.profile.logout)
  })
})
