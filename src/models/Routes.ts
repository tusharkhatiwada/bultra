export const Routes = {
  auth: {
    navigator: "auth",
    login: "auth/login",
    signup: "auth/signup",
  },
  main: {
    navigator: "main",
    home: "main/home",
    wallet: "main/wallet",
    referrals: "main/referrals",
    account: "main/account",
  },
  notFound: "notFound",
} as const
