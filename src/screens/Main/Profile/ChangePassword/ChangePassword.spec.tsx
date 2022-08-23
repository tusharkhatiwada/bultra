import { ChangePassword, ChangePasswordProps } from "./ChangePassword"

import { render } from "tests/app-tests-utils"

const props = {} as ChangePasswordProps

describe("ChangePassword", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<ChangePassword {...props} />)

    expect(getByText("This is the ChangePassword component!")).toBeTruthy()
  })
})
