import { AuthApi } from "./auth"
import { ProfileApi } from "./profile"
import { ReferralApi } from "./referral"
import { WalletApi } from "./wallet"
import { InvestApi } from "./invest"

export interface Api {
  auth: AuthApi
  profile: ProfileApi
  referral: ReferralApi
  wallet: WalletApi
  invest: InvestApi
}
