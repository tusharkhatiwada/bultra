import { UserInformationV2 } from "models/Profile"

export namespace ChangePassword {
  export type Params = {
    oldPassword: string
    password: string
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

export namespace GetUserProfile {
  export type Response = UserInformationV2
  export type Request = () => Promise<GetUserProfile.Response>
}

export interface ProfileApi {
  changePassword: ChangePassword.Request
  supportRequest: SupportRequest.Request
  getUserProfile: GetUserProfile.Request
}
