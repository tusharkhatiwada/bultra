import { GetNetworkList } from "api/domain/wallet"
import { createNetworkListFixture } from "fixtures/wallet/createGetNetworkListFixture"

export const createGetNetworkListFake = (): GetNetworkList.Request => () => {
  return Promise.resolve(createNetworkListFixture())
}
