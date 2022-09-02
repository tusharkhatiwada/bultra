import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Routes } from "./Routes"

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

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  Screen
>

export type ProfileStackScreenProps<Screen extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, Screen>

export type WalletStackScreenProps<Screen extends keyof WalletStackParamList> =
  NativeStackScreenProps<WalletStackParamList, Screen>

export type MainTabParamList = {
  [Routes.main.home]: undefined
  [Routes.main.referrals]: undefined
  [Routes.main.profile.navigator]: undefined
  [Routes.main.wallet.navigator]: undefined
}

export type AuthStackParamList = {
  [Routes.auth.login]: undefined
  [Routes.auth.create_account]: undefined
  [Routes.auth.kyc]: undefined
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
