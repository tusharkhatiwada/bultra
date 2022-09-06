import { Wallet } from "models/Wallet"

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

export interface WalletApi {
  getWallet: GetWallet.Request
  withdrawalRequest: WithdrawalRequest.Request
}
