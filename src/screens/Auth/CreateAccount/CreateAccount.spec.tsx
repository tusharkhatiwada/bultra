import { CreateAccount, CreateAccountProps } from "./CreateAccount"

import { render } from "tests/app-tests-utils"

const props = {} as CreateAccountProps

describe("CreateAccount", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<CreateAccount {...props} />)

    expect(getByText("CreateAccount")).toBeTruthy()
  })
})
