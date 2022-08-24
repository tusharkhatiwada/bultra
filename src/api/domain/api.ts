import { AuthApi } from "./auth"
import { ProfileApi } from "./profile"

export interface Api {
  auth: AuthApi
  profile: ProfileApi
}
