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

export type MainTabParamList = {
  [Routes.main.home]: undefined
  [Routes.main.wallet]: undefined
  [Routes.main.referrals]: undefined
  [Routes.main.profile]: undefined
}

export type AuthStackParamList = {
  [Routes.auth.login]: undefined
  [Routes.auth.create_account]: undefined
  [Routes.auth.plans]: undefined
}
