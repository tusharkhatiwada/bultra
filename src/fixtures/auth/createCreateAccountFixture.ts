import { CreateAccount } from "api/domain/auth"

export const createCreateAccountFixture = (): CreateAccount.Response => {
  return { message: "FAKE", codeEndTime: "" }
}
