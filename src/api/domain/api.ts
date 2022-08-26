import { AuthApi } from "./auth"
import { ProfileApi } from "./profile"
import { ReferralApi } from "./referral"

export interface Api {
  auth: AuthApi
  profile: ProfileApi
  referral: ReferralApi
}
