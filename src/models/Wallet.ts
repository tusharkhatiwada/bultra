export type Wallet = {
  balance: number
  profitSummary: ProfitSummary
}

export type ProfitSummaryRange = "last24hours" | "lastMonth" | "last7days"

export type TransactionRange = "last24hours" | "month" | "lastMonth" | "last6" | "all"

export type ProfitSummary = {
  last24hours: number
  last7days: number
  lastMonth: number
}

export type WalletHistory = {
  id: string
  userId: string
  type: "DEPOSIT" | "WITHDRAWAL"
  date: Date
  amount: number
  balance: number
}
