export const Routes = {
  home: "home",
  auth: {
    navigator: "auth",
    login: "auth/login",
    create_account: "auth/create_account",
    plans: "auth/plans",
  },
  main: {
    navigator: "main",
    home: "main/home",
    wallet: "main/wallet",
    referrals: "main/referrals",
    profile: {
      navigator: "main/profile",
      userProfile: "main/profile/user_profile",
      support: "main/profile/support",
      changePassword: "main/profile/change_password",
      logout: "main/profile/logout",
    },
  },
  notFound: "notFound",
} as const
