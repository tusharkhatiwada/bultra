import { Login, LoginProps } from "./Login"

import { render } from "tests/app-tests-utils"

const props = {} as LoginProps

describe("Login", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<Login {...props} />)

    expect(getByText("Login")).toBeTruthy()
  })
})
