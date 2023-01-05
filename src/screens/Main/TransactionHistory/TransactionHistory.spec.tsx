import { TransactionHistory, TransactionHistoryProps } from "./TransactionHistory"
import { render, waitFor } from "tests/app-tests-utils"

const props = {
  navigation: {
    navigate: jest.fn(),
  },
} as unknown as TransactionHistoryProps

describe("TransactionHistory", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<TransactionHistory {...props} />)

    await waitFor(() => {
      expect(getByText("history.title")).toBeTruthy()
    })
  })
})
