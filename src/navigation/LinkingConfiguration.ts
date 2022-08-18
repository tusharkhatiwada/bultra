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
      [Routes.main.navigator]: {
        screens: {
          [Routes.main.home]: Routes.main.home,
          [Routes.main.wallet]: Routes.main.wallet,
          [Routes.main.referrals]: Routes.main.referrals,
          [Routes.main.profile]: Routes.main.profile,
        },
      },
      [Routes.auth.navigator]: {
        screens: {
          [Routes.auth.login]: Routes.auth.login,
          [Routes.auth.create_account]: Routes.auth.create_account,
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
}

export default linking
