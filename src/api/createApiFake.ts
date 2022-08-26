import { Api } from "./domain/api"
import { createChangePasswordFake } from "./profile/fake/createChangePasswordFake"
import { createCreateAccountFake } from "./auth/fake/createCreateAccountFake"
import { createFetchReferralLevelsFake } from "./referral/fake/createFetchReferralLevelsFake"
import { createLoginFake } from "./auth/fake/createLoginFake"
import { createPlanSubscriptionFake } from "./auth/fake/createPlanSubscriptionFake"
import { createSupportRequestFake } from "./profile/fake/createSupportRequestFake"

export function createApiFake(): Api {
  return {
    auth: {
      login: createLoginFake(),
      createAccount: createCreateAccountFake(),
      planSubscription: createPlanSubscriptionFake(),
    },
    profile: {
      changePassword: createChangePasswordFake(),
      supportRequest: createSupportRequestFake(),
    },
    referral: {
      fetchReferralLevels: createFetchReferralLevelsFake(),
    },
  }
}
