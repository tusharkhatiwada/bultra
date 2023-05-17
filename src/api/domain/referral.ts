import { ReferralLevels } from "models/Referrals"

export namespace FetchReferralLevels {
  // export type Params = DateRange
  export type Response = ReferralLevels
  export type Request = () => Promise<FetchReferralLevels.Response>
}

export interface ReferralApi {
  fetchReferralLevels: FetchReferralLevels.Request
}
