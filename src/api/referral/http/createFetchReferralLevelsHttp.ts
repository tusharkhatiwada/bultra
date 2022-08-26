import { AxiosInstance, AxiosResponse } from "axios"

import { FetchReferralLevels } from "api/domain/referral"
import { ReferralLevel } from "models/Referrals"

export const createFetchReferralLevelsHttp =
  (client: AxiosInstance): FetchReferralLevels.Request =>
  async () => {
    const { data }: AxiosResponse<ReferralLevel[]> = await client.get("/v1/referrals/")

    return data
  }
