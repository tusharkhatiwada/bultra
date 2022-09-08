import { WalletHistory } from "models/Wallet"

export const createWalletHistoryFixture = (): WalletHistory[] => {
  return [
    {
      type: "DEPOSIT",
      date: new Date("2022-02-24"),
      amount: 0.3,
      balance: 14320.3,
    },
    {
      type: "WITHDRAWAL",
      date: new Date("2022-02-24"),
      amount: 0.3,
      balance: 14320.3,
    },
    {
      type: "DEPOSIT",
      date: new Date("2022-02-24"),
      amount: 0.3,
      balance: 14320.3,
    },
    {
      type: "WITHDRAWAL",
      date: new Date("2022-02-24"),
      amount: 0.3,
      balance: 14320.3,
    },
    {
      type: "DEPOSIT",
      date: new Date("2022-02-24"),
      amount: 0.3,
      balance: 14320.3,
    },
    {
      type: "WITHDRAWAL",
      date: new Date("2022-02-24"),
      amount: 0.3,
      balance: 14320.3,
    },
  ]
}
