import { AuthApi } from "./auth"
import { ProfileApi } from "./profile"
import { ReferralApi } from "./referral"
import { WalletApi } from "./wallet"
import { InvestApi } from "./invest"
import { HashApi } from "./hash"
import { TradeApi } from "./trade"
import { PnlApi } from "./pnl"

export interface Api {
  auth: AuthApi
  profile: ProfileApi
  referral: ReferralApi
  wallet: WalletApi
  invest: InvestApi
  hash: HashApi
  trade: TradeApi
  pnl: PnlApi
}
