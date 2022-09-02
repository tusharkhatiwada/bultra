import { Deposit, DepositProps } from "./Deposit"

import { render } from "tests/app-tests-utils"

const props = {} as DepositProps

describe("Deposit", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<Deposit {...props} />)

    expect(getByText("wallet.deposit.description")).toBeTruthy()
  })
})
