import { PlanTypes, SubscriptionTypes } from "models/Plans"

import { CameraCapturedPicture } from "expo-camera"
import { DocumentResult } from "expo-document-picker"
import { ForgotPassword } from "screens/Auth/ForgotPassword"
import { NetworkTypes } from "models/Networks"

export namespace Login {
  export type Params = {
    email: string
    password: string
  }
  export type Response = string
  export type Request = (params: Login.Params) => Promise<Login.Response>
}

export namespace ForgotPassword {
  export type Params = {
    email: string
  }
  export type Response = void
  export type Request = (params: ForgotPassword.Params) => Promise<ForgotPassword.Response>
}

export namespace ResetPassword {
  export type Params = {
    password: string
    token: string
  }
  export type Response = void
  export type Request = (params: ResetPassword.Params) => Promise<ResetPassword.Response>
}

export namespace CreateAccount {
  export type Params = {
    email: string
    password: string
    referralId?: string
  }
  export type Response = string
  export type Request = (params: CreateAccount.Params) => Promise<CreateAccount.Response>
}

export namespace PlanSubscription {
  export type Params = {
    type: PlanTypes
    subscription: SubscriptionTypes
    network: NetworkTypes
  }
  export type Response = void
  export type Request = (params: PlanSubscription.Params) => Promise<PlanSubscription.Response>
}

export namespace KYC {
  export type Params = {
    name: string
    documentType: string
    documentNumber: string
    address: string
    documentPhoto: CameraCapturedPicture
    invoice: Exclude<DocumentResult, { type: "cancel" }>
  }
  export type Response = void
  export type Request = (params: KYC.Params) => Promise<KYC.Response>
}

export interface AuthApi {
  login: Login.Request
  forgotPassword: ForgotPassword.Request
  resetPassword: ResetPassword.Request
  createAccount: CreateAccount.Request
  planSubscription: PlanSubscription.Request
  kyc: KYC.Request
}
