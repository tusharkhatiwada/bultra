import { ReferralLevels } from "models/Referrals"

export const createReferralLevelFixture = (): ReferralLevels => {
  return {
    level1: {
      count: 1,
      balance: 0,
      users: [
        {
          id: "test",
          email: "test",
          statusPlan: false,
        },
      ],
    },
    level2: {
      count: 1,
      balance: 0,
      users: [
        {
          id: "test",
          email: "test",
          statusPlan: false,
        },
      ],
    },
    level3: {
      count: 1,
      balance: 0,
      users: [
        {
          id: "test",
          email: "test",
          statusPlan: false,
        },
      ],
    },
  }
}
