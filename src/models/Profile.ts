import { Plan } from "./Plans"

export type UserInformation = {
  name?: string
  email: string
  referralId: string
  status: UserStatus
}

export type UserInformationV2 = {
  Plan: Plan | null
  email: string
  id: string
  status: string
}

export enum UserStatus {
  ACCOUNT_NOT_VALIDATED = "ACCOUNT_NOT_VALIDATED",
  MISSING_PLAN = "MISSING_PLAN",
  MISSING_PAYMENT = "MISSING_PAYMENT",
  MISSING_FUNDS = "MISSING_FUNDS",
  VALIDATED = "VALIDATED",
}
