export const Routes = {
  home: "home",
  auth: {
    navigator: "auth",
    login: "auth/login",
    create_account: "auth/create_account",
    kyc: "auth/kyc",
    document_photo: "auth/document_photo",
    plans: "auth/plans",
  },
  main: {
    navigator: "main",
    home: "main/home",
    referrals: "main/referrals",
    profile: {
      navigator: "main/profile",
      userProfile: "main/profile/user_profile",
      support: "main/profile/support",
      changePassword: "main/profile/change_password",
      logout: "main/profile/logout",
    },
    wallet: {
      navigator: "main/wallet",
      walletDetails: "main/wallet/detail",
      deposit: "main/wallet/deposit",
      withdraw: "main/wallet/withdraw",
    },
  },
  notFound: "notFound",
} as const
