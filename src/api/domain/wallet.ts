import { Wallet, WalletHistory } from "models/Wallet"

import { DateRange } from "models/Date"

export namespace GetWallet {
  export type Response = Wallet
  export type Request = () => Promise<GetWallet.Response>
}

export namespace WithdrawalRequest {
  export type Params = {
    network: string
    walletAddress: string
    amount: number
  }
  export type Response = string
  export type Request = (params: WithdrawalRequest.Params) => Promise<WithdrawalRequest.Response>
}

export namespace FetchWalletHistory {
  export type Params = DateRange
  export type Response = WalletHistory[]
  export type Request = (params: FetchWalletHistory.Params) => Promise<FetchWalletHistory.Response>
}

export interface WalletApi {
  getWallet: GetWallet.Request
  withdrawalRequest: WithdrawalRequest.Request
  fetchWalletHistory: FetchWalletHistory.Request
}
