import { TransactionRange, Wallet, WalletHistory } from "models/Wallet"

import { Network } from "models/Networks"

export namespace GetWallet {
  export type Response = Wallet
  export type Request = () => Promise<GetWallet.Response>
}

export namespace WithdrawalRequest {
  export type Params = {
    blockchain: string
    addressTo: string
    amount: number
    token: string
  }
  export type Response = string
  export type Request = (params: WithdrawalRequest.Params) => Promise<WithdrawalRequest.Response>
}

export namespace FetchWalletHistory {
  export type Params = TransactionRange
  export type Response = WalletHistory[]
  export type Request = (params: FetchWalletHistory.Params) => Promise<FetchWalletHistory.Response>
}

export namespace GetNetworkList {
  export type Response = Network[]
  export type Request = () => Promise<GetNetworkList.Response>
}

export interface WalletApi {
  getWallet: GetWallet.Request
  withdrawalRequest: WithdrawalRequest.Request
  fetchWalletHistory: FetchWalletHistory.Request
  getNetworkList: GetNetworkList.Request
}
