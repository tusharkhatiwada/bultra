import { GetWallet } from "api/domain/wallet"
import { createWalletFixture } from "fixtures/wallet/createWalletFixture"

export const createGetWalletFake = (): GetWallet.Request => () => {
  return Promise.resolve(createWalletFixture())
}
