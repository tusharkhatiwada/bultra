export type ReferralLevels = {
  level1: ReferralLevelType
  level2: ReferralLevelType
  level3: ReferralLevelType
}

export type ReferralLevelType = {
  count: number
  balance: number
  users: {
    id: string
    email: string
    statusPlan: boolean
  }[]
}
