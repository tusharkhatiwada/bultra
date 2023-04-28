import { GetDataInvest } from "../../api/domain/invest"

export const createDataInvestFixture = (): GetDataInvest.Response => {
  return {
    userDeposit: 0,
    positions: [
      {
        BTCUSDT: [0],
      },
      {
        ETHUSDT: [0],
      },
    ],
    profits: {
      last24h: { amount: 1, percent: 1 },
      last7d: { amount: 1, percent: 1 },
      lastM: { amount: 1, percent: 1 },
    },
  }
}
