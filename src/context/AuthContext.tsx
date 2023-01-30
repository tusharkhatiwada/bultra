import React, { FC, useContext, useEffect, useMemo, useState } from "react"
import { StorageKey, createSecureStorage } from "services/SecureStorage"

import { UserInformation, UserInformationV2 } from "models/Profile"
import { useGetUserProfile } from "hooks/profile/useGetUserProfile"
import { Plan } from "../models/Plans"

export type AuthContextProps = {
  token: string | null
  setToken: (token: string) => void
  selectedPlan: Plan | null
  setSelectedPlan: (plan: Plan | null) => void
  isLoggedIn: boolean
  user?: UserInformation
  setUserV2: (user: UserInformationV2) => void
  userV2?: UserInformationV2
  logout: () => Promise<void>
}

export const AuthContext = React.createContext(null as unknown as AuthContextProps)

const storage = createSecureStorage()

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<UserInformation>()
  const [userV2, setUserV2] = useState<UserInformationV2>()
  const [stateToken, setStateToken] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

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
    await storage.delete(StorageKey.ACCESS_TOKEN).then(() => {
      setStateToken(null)
    })
  }

  const isLoggedIn = Boolean(stateToken)

  const { userProfile } = useGetUserProfile()

  useEffect(() => {
    if (userProfile && stateToken) {
      setUser(userProfile)
    }
  }, [userProfile, stateToken])

  const value = useMemo(
    () => ({
      token: stateToken,
      setToken,
      selectedPlan,
      setSelectedPlan,
      user,
      userV2,
      setUserV2,
      isLoggedIn,
      logout,
    }),
    [stateToken, setToken, selectedPlan, setSelectedPlan],
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
