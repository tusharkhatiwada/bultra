/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native"
import { RootStackParamList } from "../models/Navigation"
import { Routes } from "models/Routes"

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ["https://fast-growing.com"],
  config: {
    screens: {
      [Routes.home]: Routes.home,
      [Routes.main.navigator]: {
        screens: {
          [Routes.main.home]: Routes.main.home,
          [Routes.main.wallet.navigator]: {
            screens: {
              [Routes.main.wallet.walletDetails]: Routes.main.wallet.walletDetails,
              [Routes.main.wallet.deposit]: Routes.main.wallet.deposit,
              [Routes.main.wallet.withdraw]: Routes.main.wallet.withdraw,
            },
          },
          [Routes.main.referrals]: Routes.main.referrals,
          [Routes.main.transactionHistory]: Routes.main.transactionHistory,
          [Routes.main.profile.navigator]: {
            screens: {
              [Routes.main.profile.userProfile]: Routes.main.profile.userProfile,
              [Routes.main.profile.support]: Routes.main.profile.support,
              [Routes.main.profile.changePassword]: Routes.main.profile.changePassword,
              [Routes.main.profile.logout]: Routes.main.profile.logout,
            },
          },
        },
      },
      [Routes.auth.navigator]: {
        screens: {
          [Routes.auth.login]: Routes.auth.login,
          [Routes.auth.otp]: Routes.auth.otp,
          [Routes.auth.create_account]: Routes.auth.create_account,
          [Routes.auth.forgot_password]: Routes.auth.forgot_password,
          [Routes.auth.reset_password]: Routes.auth.reset_password,
          [Routes.auth.kyc]: Routes.auth.kyc,
          [Routes.auth.document_photo]: Routes.auth.document_photo,
          [Routes.auth.plans]: Routes.auth.plans,
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
}

export default linking
