export type Wallet = {
  balance: number
  profitSummary: ProfitSummary
  wallets: WalletsType[]
}

export type ProfitSummaryRange = "last24hours" | "lastMonth" | "last7days"

export type TransactionRange = "last24hours" | "month" | "lastMonth" | "last6" | "all"

export type ProfitSummary = {
  last24hours: number
  last7days: number
  lastMonth: number
}

export type WalletBalance = { token: "USDT" | "BNB" | "TRX" | "ETH"; balance: string }

export type WalletsType = {
  id: string
  name: "ERC20" | "TRC20" | "BEP20"
  address: string
  balance: WalletBalance[]
}

export type WalletHistory = {
  id: string
  userId: string
  type: "DEPOSIT" | "WITHDRAWAL"
  date: Date
  hash: string
  amount: number
  balance: number
}
