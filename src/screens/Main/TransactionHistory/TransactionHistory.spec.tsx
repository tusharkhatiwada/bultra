import { TransactionHistory, TransactionHistoryProps } from "./TransactionHistory"
import { render, waitFor } from "tests/app-tests-utils"

const props = {} as TransactionHistoryProps

describe("TransactionHistory", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<TransactionHistory {...props} />)

    await waitFor(() => {
      expect(getByText("wallet.history.title")).toBeTruthy()
    })
  })
})
