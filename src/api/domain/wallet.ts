import { Wallet } from "models/Wallet"

export namespace GetWallet {
  export type Response = Wallet
  export type Request = () => Promise<GetWallet.Response>
}

export interface WalletApi {
  getWallet: GetWallet.Request
}
