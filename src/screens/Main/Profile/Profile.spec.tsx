import { Profile, ProfileProps } from "./Profile"

import { render } from "tests/app-tests-utils"

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
})
