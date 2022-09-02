import { Wallet } from "models/Wallet"

export const createWalletFixture = (): Wallet => {
  return {
    balance: 14320.0,
    profitSummary: {
      last24hours: 1.45,
      last7days: -3.33,
      lastMonth: 6.32,
    },
  }
}
