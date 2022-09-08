import { FetchWalletHistory } from "api/domain/wallet"
import { createWalletHistoryFixture } from "fixtures/wallet/createWalletHistoryFixture"

export const createFetchWalletHistoryFake = (): FetchWalletHistory.Request => () => {
  return Promise.resolve(createWalletHistoryFixture())
}
