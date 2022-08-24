export namespace ChangePassword {
  export type Params = {
    oldPassword: string
    newPassword: string
  }
  export type Response = string
  export type Request = (params: ChangePassword.Params) => Promise<ChangePassword.Response>
}

export interface ProfileApi {
  changePassword: ChangePassword.Request
}
