import { CameraCapturedPicture } from "expo-camera"
import { DocumentResult } from "expo-document-picker"
import { Plan } from "models/Plans"
import { UserInformationV2 } from "../../models/Profile"

export namespace Login {
  export type Params = {
    email: string
    password: string
  }
  export type Response = {
    status?: string
    accessToken: { accessToken: string }
    user?: UserInformationV2
  }
  export type Request = (params: Login.Params) => Promise<Login.Response>
}

export namespace ConfirmOtp {
  export type Params = {
    email: string
    code: string
  }
  export type Response = {
    accessToken: { accessToken: string }
    user?: UserInformationV2
  }
  export type Request = (params: ConfirmOtp.Params) => Promise<ConfirmOtp.Response>
}

export namespace ConfirmForgotPasswordOtp {
  export type Params = {
    email: string
    code: string
  }
  export type Response = { hash: string }
  export type Request = (
    params: ConfirmForgotPasswordOtp.Params,
  ) => Promise<ConfirmForgotPasswordOtp.Response>
}

export namespace ResendOtp {
  export type Params = {
    email: string
  }
  export type Response = { message: string; codeEndTime: string }
  export type Request = (params: ResendOtp.Params) => Promise<ResendOtp.Response>
}

export namespace ForgotPassword {
  export type Params = {
    email: string
  }
  export type Response = { message: string; codeEndTime: string }
  export type Request = (params: ForgotPassword.Params) => Promise<ForgotPassword.Response>
}

export namespace PasswordRecovery {
  export type Params = {
    hash: string
    email: string
    password: string
  }
  export type Response = { message: string }
  export type Request = (params: PasswordRecovery.Params) => Promise<PasswordRecovery.Response>
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
    ref?: string
  }
  export type Response = { message: string; codeEndTime: string }
  export type Request = (params: CreateAccount.Params) => Promise<CreateAccount.Response>
}

export namespace GetPlans {
  // export type Params = {
  //   type: PlanTypes
  //   network: NetworkTypes
  // }
  export type Response = Plan[]
  export type Request = () => Promise<GetPlans.Response>
}

export namespace GetPriceUpdatePlan {
  export type Params = {
    id: string
  }
  export type Response = {
    amount: number
    current: number
    new: number
  }
  export type Request = (params: GetPriceUpdatePlan.Params) => Promise<GetPriceUpdatePlan.Response>
}

export namespace PlanSubscription {
  export type Params = {
    // type: PlanTypes
    // network: NetworkTypes
    id: string
  }
  export type Response = UserInformationV2
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
  confirmForgotPasswordOtp: ConfirmForgotPasswordOtp.Request
  passwordRecovery: PasswordRecovery.Request
  resendOtp: ResendOtp.Request
  forgotPassword: ForgotPassword.Request
  resetPassword: ResetPassword.Request
  createAccount: CreateAccount.Request
  planSubscription: PlanSubscription.Request
  kyc: KYC.Request
  getPlans: GetPlans.Request
  getPriceUpdatePlan: GetPriceUpdatePlan.Request
}
