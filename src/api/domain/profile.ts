export namespace ChangePassword {
  export type Params = {
    oldPassword: string
    newPassword: string
  }
  export type Response = string
  export type Request = (params: ChangePassword.Params) => Promise<ChangePassword.Response>
}

export namespace SupportRequest {
  export type Params = {
    phoneNumber: string
    message: string
  }
  export type Response = string
  export type Request = (params: SupportRequest.Params) => Promise<SupportRequest.Response>
}

export interface ProfileApi {
  changePassword: ChangePassword.Request
  supportRequest: SupportRequest.Request
}
