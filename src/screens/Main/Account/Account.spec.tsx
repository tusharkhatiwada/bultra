import { Account, AccountProps } from "./Account"

import { render } from "tests/app-tests-utils"

const props = {
  navigation: {
    navigate: jest.fn(),
  },
} as unknown as AccountProps

describe("Account", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<Account {...props} />)

    expect(getByText("account.title")).toBeTruthy()
  })
})
