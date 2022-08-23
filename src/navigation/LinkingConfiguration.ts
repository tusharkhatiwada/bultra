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
          [Routes.main.wallet]: Routes.main.wallet,
          [Routes.main.referrals]: Routes.main.referrals,
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
          [Routes.auth.create_account]: Routes.auth.create_account,
          [Routes.auth.plans]: Routes.auth.plans,
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
}

export default linking
