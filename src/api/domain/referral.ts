import { DateRange } from "models/Date"
import { ReferralLevel } from "models/Referrals"

export namespace FetchReferralLevels {
  export type Params = DateRange
  export type Response = ReferralLevel[]
  export type Request = (
    params: FetchReferralLevels.Params,
  ) => Promise<FetchReferralLevels.Response>
}

export interface ReferralApi {
  fetchReferralLevels: FetchReferralLevels.Request
}
