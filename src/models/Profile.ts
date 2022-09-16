export type UserInformation = {
  name?: string
  email: string
  referralId: string
  status: UserStatus
}

export enum UserStatus {
  ACCOUNT_NOT_VALIDATED = "ACCOUNT_NOT_VALIDATED",
  MISSING_PLAN = "MISSING_PLAN",
  MISSING_PAYMENT = "MISSING_PAYMENT",
  MISSING_FUNDS = "MISSING_FUNDS",
  VALIDATED = "VALIDATED",
}
