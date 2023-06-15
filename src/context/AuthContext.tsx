import React, { FC, useContext, useEffect, useMemo, useState } from "react"
import { StorageKey, createSecureStorage } from "services/SecureStorage"

import { UserInformationV2 } from "models/Profile"
import { useGetUserProfile } from "hooks/profile/useGetUserProfile"
import { Plan } from "../models/Plans"
import { isNil } from "lodash"
import { useQueryClient } from "@tanstack/react-query"
import { useGetWallet } from "../hooks/wallet/useGetWallet"

export type AuthContextProps = {
  token: string | null
  setToken: (token: string) => void
  setUser: (userInfo?: UserInformationV2) => void
  selectedPlan: Plan | null
  setSelectedPlan: (plan: Plan | null) => void
  isLoggedIn: boolean
  user?: UserInformationV2
  changeUserPlanLocal: (plan: Plan) => void
  logout: () => Promise<void>
  login: () => Promise<void>
  fetchUserOptions?: { refetchInterval: number }
}

export const AuthContext = React.createContext(null as unknown as AuthContextProps)

const storage = createSecureStorage()

// @ts-ignore
export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<UserInformationV2>()
  const [stateToken, setStateToken] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  // const { removeWallet } = useGetWallet()

  storage.get(StorageKey.ACCESS_TOKEN).then((storageToken) => {
    setStateToken(storageToken)
  })

  const setStorageToken = async (token: string) => await storage.set(StorageKey.ACCESS_TOKEN, token)

  const setToken = (token: string) => {
    setStorageToken(token)
    setStateToken(token)
  }

  const logout = async () => {
    setUser(undefined)
    // removeUser()
    // removeWallet()
    await storage.delete(StorageKey.ACCESS_TOKEN).then(() => {
      setStateToken(null)
    })
    await storage.delete(StorageKey.USER_EMAIL)
    await storage.delete(StorageKey.INITIATE_TRADING)
    await storage.delete(StorageKey.BOT_ACTIVATED)
    await storage.delete(StorageKey.USER_TRADING_EMAIL)
    await storage.delete(StorageKey.USER_ID)
  }
  const login = async () => {
    // removeUser()
    // removeWallet()
    storage.get(StorageKey.ACCESS_TOKEN).then((storageToken) => {
      setStateToken(storageToken)
    })
  }

  const isLoggedIn = Boolean(stateToken)

  // const { userProfile, removeUser } = useGetUserProfile(isLoggedIn)
  const changeUserPlanLocal = (plan: Plan) => {
    const newUser = { ...user }
    if (!isNil(newUser.UserPlan)) {
      newUser.UserPlan.Plan.name = plan.name
      // @ts-ignore
      setUser(newUser)
    }
  }

  // useEffect(() => {
  //   if (userProfile && stateToken) {
  //     setUser(userProfile)
  //   }
  // }, [userProfile, stateToken])

  const value = useMemo(
    () => ({
      token: stateToken,
      setToken,
      setUser,
      selectedPlan,
      setSelectedPlan,
      user,
      changeUserPlanLocal,
      isLoggedIn,
      logout,
      login,
    }),
    [stateToken, setToken, setUser, selectedPlan, setSelectedPlan],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (context == null) {
    throw new Error("useAuthStateContext must be used within an AuthProvider")
  }

  return context
}
