import { Api } from "./domain/api"
import { createChangePasswordFake } from "./profile/fake/createChangePasswordFake"
import { createCreateAccountFake } from "./auth/fake/createCreateAccountFake"
import { createFetchReferralLevelsFake } from "./referral/fake/createFetchReferralLevelsFake"
import { createFetchWalletHistoryFake } from "./wallet/fake/createFetchWalletHistoryFake"
import { createForgotPasswordFake } from "./auth/fake/createForgotPasswordFake"
import { createGetNetworkListFake } from "./wallet/fake/createGetNetworkListFake"
import { createGetUserProfileFake } from "./profile/fake/createGetUserProfileFake"
import { createGetWalletFake } from "./wallet/fake/createGetWalletFake"
import { createKYCFake } from "./auth/fake/createKYCFake"
import { createLoginFake } from "./auth/fake/createLoginFake"
import { createPlanSubscriptionFake } from "./auth/fake/createPlanSubscriptionFake"
import { createResetPasswordFake } from "./auth/fake/createResetPasswordFake"
import { createSupportRequestFake } from "./profile/fake/createSupportRequestFake"
import { createWithdrawalRequestFake } from "./wallet/fake/createWithdrawalRequestFake"
import { createOtpFake } from "./auth/fake/createOtpFake"

export function createApiFake(): Api {
  return {
    auth: {
      login: createLoginFake(),
      otp: createOtpFake(),
      forgotPassword: createForgotPasswordFake(),
      resetPassword: createResetPasswordFake(),
      createAccount: createCreateAccountFake(),
      planSubscription: createPlanSubscriptionFake(),
      kyc: createKYCFake(),
    },
    profile: {
      changePassword: createChangePasswordFake(),
      supportRequest: createSupportRequestFake(),
      getUserProfile: createGetUserProfileFake(),
    },
    referral: {
      fetchReferralLevels: createFetchReferralLevelsFake(),
    },
    wallet: {
      getWallet: createGetWalletFake(),
      withdrawalRequest: createWithdrawalRequestFake(),
      fetchWalletHistory: createFetchWalletHistoryFake(),
      getNetworkList: createGetNetworkListFake(),
    },
  }
}
