import { UserInformation, UserStatus } from "models/Profile"

export const createUserFixture = (): UserInformation => {
  return {
    name: "Eduardo López Rodríguez",
    email: "eduardo90@gmail.com",
    referralId: "eduardo90",
    status: UserStatus.MISSING_PLAN,
  }
}
