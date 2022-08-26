import { FetchReferralLevels } from "api/domain/referral"
import { createReferralLevelFixture } from "fixtures/referrals/createReferralLevelFixture"

export const createFetchReferralLevelsFake = (): FetchReferralLevels.Request => () => {
  return Promise.resolve(createReferralLevelFixture())
}
