import { createSecureStorage, StorageKey } from "services/SecureStorage"

import { Api } from "./domain/api"
import axios from "axios"
import { createApiFake } from "./createApiFake"
import { createChangePasswordFake } from "./profile/fake/createChangePasswordFake"
import { createFetchReferralLevelsFake } from "./referral/fake/createFetchReferralLevelsFake"
import { createGetNetworkListFake } from "./wallet/fake/createGetNetworkListFake"
import { createGetUserProfileFake } from "./profile/fake/createGetUserProfileFake"
import { createKYCFake } from "./auth/fake/createKYCFake"
import { createPlanSubscriptionFake } from "./auth/fake/createPlanSubscriptionFake"
import { createResetPasswordFake } from "./auth/fake/createResetPasswordFake"
import { createSupportRequestFake } from "./profile/fake/createSupportRequestFake"
import { createCreateAccountHttp } from "./auth/http/createCreateAccountHttp"
import { confirmOtpHttp } from "./auth/http/confirmOtpHttp"
import { createLoginHttp } from "./auth/http/createLoginHttp"
import { resendOtpHttp } from "./auth/http/resendOtp"
import { createForgotPasswordHttp } from "./auth/http/createForgotPasswordHttp"
import { confirmForgotPasswordOtpHttp } from "./auth/http/confirmForgotPasswordOtpHttp"
import { createPasswordRecoveryHttp } from "./auth/http/createPasswordRecoveryHttp"
import { createGetWalletHttp } from "./wallet/http/createGetWalletHttp"
import { createFetchWalletHistoryHttp } from "./wallet/http/createFetchWalletHistoryHttp"
import { createWithdrawalRequestHttp } from "./wallet/http/createWithdrawalRequestHttp"

export function createApi(offline: boolean): Api {
  if (offline) return createApiFake()

  const httpClient = axios.create({
    baseURL: "https://45.155.120.204/api",
  })

  const secureStorage = createSecureStorage()

  httpClient.interceptors.request.use(async function (config) {
    const token = await secureStorage.get(StorageKey.ACCESS_TOKEN)

    if (config.headers) {
      if (config.headers.Authorization) return config

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  })

  httpClient.interceptors.response.use(
    (res) => {
      console.info(res.config.url)
      return res
    },
    (error) => {
      const {
        response: { data, config },
      } = error

      const response = {
        data,
        headers: config.headers,
        url: config.url,
      }

      if (response.data.status === "NOT_CONFIRMED") {
        return response
      }

      console.error(response)
      throw new Error(error.response.data)
    },
  )

  return {
    auth: {
      login: createLoginHttp(httpClient),
      otp: confirmOtpHttp(httpClient),
      confirmForgotPasswordOtp: confirmForgotPasswordOtpHttp(httpClient),
      passwordRecovery: createPasswordRecoveryHttp(httpClient),
      resendOtp: resendOtpHttp(httpClient),
      forgotPassword: createForgotPasswordHttp(httpClient),
      resetPassword: createResetPasswordFake(),
      createAccount: createCreateAccountHttp(httpClient),
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
      getWallet: createGetWalletHttp(httpClient),
      withdrawalRequest: createWithdrawalRequestHttp(httpClient),
      fetchWalletHistory: createFetchWalletHistoryHttp(httpClient),
      getNetworkList: createGetNetworkListFake(),
    },
  }
}
