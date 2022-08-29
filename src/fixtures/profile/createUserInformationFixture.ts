import { UserInformation } from "models/Profile"

export const createUserInformationFixture = (): UserInformation => {
  return {
    name: "Eduardo",
    surname: "López Rodríguez",
    email: "eduardo90@gmail.com",
    userRole: "ROLE", // TODO: Change this when the user roles are defined
    referralId: "eduardo90",
  }
}
