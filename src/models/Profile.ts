import { Plan } from "./Plans"

export type UserInformation = {
  name?: string
  email: string
  referralId: string
  status: UserStatus
}

export type UserInformationV2 = {
  email: string
  id: string
  status: string
  role: string
  Transaction: {
    amount: string
    date: string
    hash: string
    network: string
    token: string
    type: string
  }[]
  UserContribution: {
    contributionId: string
    deposit: number
    id: string
    Contribution: {
      createdAt: string
      deposit: number
      end: string
      finalDeposit: number
      id: string
      start: string
      status: string
    }
  }[]
  UserPlan: { autoUpdate: false; dateTo: string; Plan: Plan }
  Wallet: { address: string; id: string; name: string }[]
}

export enum UserStatus {
  ACCOUNT_NOT_VALIDATED = "ACCOUNT_NOT_VALIDATED",
  MISSING_PLAN = "MISSING_PLAN",
  MISSING_PAYMENT = "MISSING_PAYMENT",
  MISSING_FUNDS = "MISSING_FUNDS",
  VALIDATED = "VALIDATED",
}
