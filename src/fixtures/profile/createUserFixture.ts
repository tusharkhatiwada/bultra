import { UserInformationV2, UserStatus } from "models/Profile"
import { FreePlanMock } from "../../models/Plans"

export const createUserFixture = (): UserInformationV2 => {
  return {
    status: UserStatus.MISSING_PLAN,
    email: "eduardo90@gmail.com",
    id: "eduardo90",
    role: UserStatus.MISSING_PLAN,
    Transaction: [
      {
        amount: "",
        date: "",
        hash: "",
        network: "",
        token: "",
        type: "",
      },
    ],
    UserContribution: [
      {
        contributionId: "",
        deposit: 0,
        id: "",
        Contribution: {
          createdAt: "",
          deposit: 0,
          end: "",
          finalDeposit: 0,
          id: "",
          start: "",
          status: "",
        },
      },
    ],
    UserPlan: { autoUpdate: false, dateTo: "", Plan: FreePlanMock },
    Wallet: [{ address: "", id: "", name: "" }],
  }
}
