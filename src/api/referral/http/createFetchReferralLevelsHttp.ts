import { AxiosInstance, AxiosResponse } from "axios"

import { FetchReferralLevels } from "api/domain/referral"
import { ReferralLevels } from "models/Referrals"

export const createFetchReferralLevelsHttp =
  (client: AxiosInstance): FetchReferralLevels.Request =>
  async () => {
    const { data }: AxiosResponse<ReferralLevels> = await client.get("/referral")

    return data
  }
