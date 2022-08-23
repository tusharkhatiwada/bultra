import { Logout, LogoutProps } from "./Logout"

import { render } from "tests/app-tests-utils"

const props = {} as LogoutProps

describe("Logout", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<Logout {...props} />)

    expect(getByText("This is the Logout component!")).toBeTruthy()
  })
})
