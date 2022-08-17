import { Wallet, WalletProps } from "./Wallet"

import { render } from "tests/app-tests-utils"

const props = {} as WalletProps

describe("Wallet", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<Wallet {...props} />)

    expect(getByText("wallet.title")).toBeTruthy()
  })
})
