export enum NetworkTypes {
  BNB_SMART_CHAIN = "BNB_SMART_CHAIN",
  AVAX = "AVAX",
  BNB_BEACON_CHAIN = "BNB_BEACON_CHAIN",
  ETHEREUM = "ETHEREUM",
  POLYGON = "POLYGON",
}

export type Network = {
  type: NetworkTypes
  name: string
}

// TODO: This should be a fixture
export const NetworkList: Network[] = [
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
