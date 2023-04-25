import { UserInformationV2, UserStatus } from "models/Profile"

export const createUserFixture = (): UserInformationV2 => {
  return {
    Plan: null,
    email: "eduardo90@gmail.com",
    id: "eduardo90",
    status: UserStatus.MISSING_PLAN,
  }
}
