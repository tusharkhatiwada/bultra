import { SignUp, SignUpProps } from "./SignUp"

import { render } from "tests/app-tests-utils"

const props = {} as SignUpProps

describe("SignUp", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<SignUp {...props} />)

    expect(getByText("SignUp")).toBeTruthy()
  })
})
