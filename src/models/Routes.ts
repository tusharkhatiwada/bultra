export const Routes = {
  auth: {
    navigator: "auth",
    login: "auth/login",
    create_account: "auth/create_account",
  },
  main: {
    navigator: "main",
    home: "main/home",
    wallet: "main/wallet",
    referrals: "main/referrals",
    profile: "main/profile",
  },
  notFound: "notFound",
} as const
