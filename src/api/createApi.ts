import { createSecureStorage, StorageKey } from "services/SecureStorage"

import { Api } from "./domain/api"
import axios from "axios"
import { createApiFake } from "./createApiFake"
import { createFetchReferralLevelsFake } from "./referral/fake/createFetchReferralLevelsFake"
import { createGetNetworkListFake } from "./wallet/fake/createGetNetworkListFake"
import { createKYCFake } from "./auth/fake/createKYCFake"
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
import { createGetPlansHttp } from "./auth/http/getPlansHttp"
import { createPlanSubscriptionHttp } from "./auth/http/createPlanSubscriptionHttp"
import { createChangePasswordHttp } from "./profile/http/createChangePasswordHttp"
import { createInvestRequestHttp } from "./Invest/createInvestRequestHttp"
import { createGetUserHttp } from "./profile/http/createGetUserHttp"
import { createGetPriseUpdatePlanHttp } from "./profile/http/createGetPriseUpdatePlanHttp"
import { createRefundRequestHttp } from "./Invest/createRefundRequestHttp"
import { createGetDataInvestHttp } from "./Invest/createGetDataInvestHttp"
import { createFetchReferralLevelsHttp } from "./referral/http/createFetchReferralLevelsHttp"
import { generateSaltHttp } from "./hash/createSaltHttp"
import { getSaltHttp } from "./hash/getSaltHttp"
import { startTradeHttp } from "./trade/startTradeHttp"
import { activateBotHttp } from "./trade/activateBotHttp"

export function createApi(offline: boolean): Api {
  if (offline) return createApiFake()

  const httpClient = axios.create({
    baseURL: "https://exbit.dataakkadian.com/api",
  })

  const secureStorage = createSecureStorage()

  httpClient.interceptors.request.use(async function (config) {
    const token = await secureStorage.get(StorageKey.ACCESS_TOKEN)

    if (config.headers) {
      config.headers["x-api-key"] = "Wdymg9Ag7-rLOxXFoXgR5AyQUw"
      config.headers["hash-api-secret"] = "dKJqx2K1ILSdk4FFM1cpNeJ8CAclQtXujVhLMsGQAd8="
      config.headers["Accept"] = "application/json"
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
      planSubscription: createPlanSubscriptionHttp(httpClient),
      kyc: createKYCFake(),
      getPlans: createGetPlansHttp(httpClient),
      getPriceUpdatePlan: createGetPriseUpdatePlanHttp(httpClient),
    },
    profile: {
      changePassword: createChangePasswordHttp(httpClient),
      supportRequest: createSupportRequestFake(),
      getUserProfile: createGetUserHttp(httpClient),
    },
    referral: {
      fetchReferralLevels: createFetchReferralLevelsHttp(httpClient),
    },
    wallet: {
      getWallet: createGetWalletHttp(httpClient),
      withdrawalRequest: createWithdrawalRequestHttp(httpClient),
      fetchWalletHistory: createFetchWalletHistoryHttp(httpClient),
      getNetworkList: createGetNetworkListFake(),
    },
    invest: {
      investRequest: createInvestRequestHttp(httpClient),
      refundRequest: createRefundRequestHttp(httpClient),
      getDataInvest: createGetDataInvestHttp(httpClient),
    },
    hash: {
      generateSalt: generateSaltHttp(httpClient),
      getSalt: getSaltHttp(httpClient),
    },
    trade: {
      startTrade: startTradeHttp(httpClient),
      activateBot: activateBotHttp(httpClient),
    },
  }
}
