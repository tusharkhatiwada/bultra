import { Network, NetworkTypes } from "models/Networks"

export const createNetworkListFixture = (): Network[] => [
  {
    type: NetworkTypes.BNB_SMART_CHAIN,
    name: "BNB Smart Chain (BEP20)",
  },
  {
    type: NetworkTypes.AVAX,
    name: "AVAX C-Chain",
  },
  {
    type: NetworkTypes.BNB_BEACON_CHAIN,
    name: "BNB Beacon Chain (BEP2)",
  },
  {
    type: NetworkTypes.ETHEREUM,
    name: "Ethereum (ERC20)",
  },
  {
    type: NetworkTypes.POLYGON,
    name: "Polygon",
  },
]
