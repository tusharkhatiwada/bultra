export type Wallet = {
  balance: number
  profitSummary: {
    last24hours: number
    last7days: number
    lastMonth: number
  }
}

export type ProfitSummaryRange = "last24hours" | "lastMonth" | "last7days"
