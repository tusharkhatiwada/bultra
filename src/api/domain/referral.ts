import { ReferralLevel } from "models/Referrals"

export namespace FetchReferralLevels {
  export type Response = ReferralLevel[]
  export type Request = () => Promise<FetchReferralLevels.Response>
}

export interface ReferralApi {
  fetchReferralLevels: FetchReferralLevels.Request
}
