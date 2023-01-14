import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Routes } from "./Routes"
import { WithdrawalRequest } from "api/domain/wallet"

export type RootStackParamList = {
  [Routes.home]: undefined
  [Routes.main.navigator]: NavigatorScreenParams<MainTabParamList> | undefined
  [Routes.auth.navigator]: NavigatorScreenParams<AuthStackParamList> | undefined
  Modal: undefined
  NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export type MainTabScreenProps<Screen extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type ProfileStackScreenProps<Screen extends keyof ProfileStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProfileStackParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >

export type WalletStackScreenProps<Screen extends keyof WalletStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<WalletStackParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >

export type MainTabParamList = {
  [Routes.main.home]: undefined
  [Routes.main.referrals]: undefined
  [Routes.main.transactionHistory]: undefined
  [Routes.main.profile.navigator]: undefined
  [Routes.main.wallet.navigator]: undefined
}

export type AuthStackParamList = {
  [Routes.auth.login]: undefined
  [Routes.auth.otp]: { email: string, codeEndTime?: string }
  [Routes.auth.create_account]: { referralId?: string } | undefined
  [Routes.auth.forgot_password]: undefined
  [Routes.auth.forgot_password_otp]: { email: string, codeEndTime?: string }
  [Routes.auth.forgot_password_create_new]: { email: string, hash: string }
  [Routes.auth.reset_password]: { token: string }
  [Routes.auth.kyc]: WithdrawalRequest.Params
  [Routes.auth.document_photo]: undefined
  [Routes.auth.plans]: undefined
}

export type ProfileStackParamList = {
  [Routes.main.profile.userProfile]: undefined
  [Routes.main.profile.support]: undefined
  [Routes.main.profile.changePassword]: undefined
  [Routes.main.profile.logout]: undefined
}

export type WalletStackParamList = {
  [Routes.main.wallet.walletDetails]: undefined
  [Routes.main.wallet.deposit]: undefined
  [Routes.main.wallet.withdraw]: undefined
}
