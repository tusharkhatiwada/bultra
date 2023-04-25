import { GetDataInvest } from "../../api/domain/invest"

export const createDataInvestFixture = (): GetDataInvest.Response => {
  return {
    positions: [
      {
        BTCUSDT: [],
      },
      {
        ETHUSDT: [],
      },
    ],
    profits: {
      last24h: { amount: 1, percent: 1 },
      last7d: { amount: 1, percent: 1 },
      lastM: { amount: 1, percent: 1 },
    },
  }
}
