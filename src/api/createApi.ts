import { StorageKey, createSecureStorage } from "services/SecureStorage"

import { Api } from "./domain/api"
import axios from "axios"
import { createApiFake } from "./createApiFake"
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
import { createLoginHttp } from "./auth/http/createLoginHttp"

export function createApi(offline: boolean): Api {
  if (offline) return createApiFake()

  const httpClient = axios.create({
    baseURL: "https://api.exchangerate-api.com/v4/latest/BTC",
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

      console.error(response)

      throw new Error(error.response.data)
    },
  )

  return {
    auth: {
      // login: createLoginHttp(httpClient),
      login: createLoginFake(),
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
