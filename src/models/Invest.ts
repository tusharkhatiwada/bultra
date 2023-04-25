export type InvestData = {
  userDeposit: number
  positions: [
    {
      BTCUSDT: number[]
    },
    {
      ETHUSDT: number[]
    },
  ]
  profits: InvestProfitSummary
}

type ProfitItem = {
  amount: number
  percent: number
}
export type InvestProfitSummary = {
  last24h: ProfitItem
  last7d: ProfitItem
  lastM: ProfitItem
}
