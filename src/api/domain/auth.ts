import { CameraCapturedPicture } from "expo-camera"
import { DocumentResult } from "expo-document-picker"
import { NetworkTypes } from "models/Networks"
import { PlanTypes } from "models/Plans"

export namespace Login {
  export type Params = {
    email: string
    password: string
  }
  export type Response = { status?: string, accessToken: string }
  export type Request = (params: Login.Params) => Promise<Login.Response>
}

export namespace ConfirmOtp {
  export type Params = {
    email: string
    code: string
  }
  export type Response = { accessToken: string }
  export type Request = (params: ConfirmOtp.Params) => Promise<ConfirmOtp.Response>
}

export namespace ResendOtp {
  export type Params = {
    email: string
  }
  export type Response = {message: string, codeEndTime: string}
  export type Request = (params: ResendOtp.Params) => Promise<ResendOtp.Response>
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
  export type Response = {message: string, codeEndTime: string}
  export type Request = (params: CreateAccount.Params) => Promise<CreateAccount.Response>
}

export namespace PlanSubscription {
  export type Params = {
    type: PlanTypes
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
  otp: ConfirmOtp.Request
  resendOtp: ResendOtp.Request
  forgotPassword: ForgotPassword.Request
  resetPassword: ResetPassword.Request
  createAccount: CreateAccount.Request
  planSubscription: PlanSubscription.Request
  kyc: KYC.Request
}
