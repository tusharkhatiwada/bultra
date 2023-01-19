import { WalletHistoryList, WalletHistoryListProps } from "./WalletHistoryList"

import { createWalletHistoryFixture } from "fixtures/wallet/createWalletHistoryFixture"
import { formatNumberToCurrency } from "utils/currency"
import { render } from "tests/app-tests-utils"

const props = {
  walletHistory: createWalletHistoryFixture(),
} as WalletHistoryListProps

describe("WalletHistoryList", () => {
  it("renders walletHistory", async () => {
    const { findAllByText } = await render(<WalletHistoryList {...props} />)

    expect(
      await findAllByText(formatNumberToCurrency(props.walletHistory[0].amount)),
    ).toHaveLength(6)
  })
})
