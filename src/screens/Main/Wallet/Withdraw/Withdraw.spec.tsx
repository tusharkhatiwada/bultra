import { Withdraw, WithdrawProps } from "./Withdraw"

import { render } from "tests/app-tests-utils"

const props = {} as WithdrawProps

describe("Withdraw", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<Withdraw {...props} />)

    expect(getByText("Go to KYC form")).toBeTruthy()
  })
})
