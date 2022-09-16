import React, { FC, useContext, useEffect, useMemo, useState } from "react"
import { StorageKey, createSecureStorage } from "services/SecureStorage"

import { UserInformation } from "models/Profile"
import { useGetUserProfile } from "hooks/profile/useGetUserProfile"

export type AuthContextProps = {
  token: string | null
  setToken: (token: string) => void
  isLoggedIn: boolean
  user?: UserInformation
  logout: () => Promise<void>
}

export const AuthContext = React.createContext(null as unknown as AuthContextProps)

const storage = createSecureStorage()

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<UserInformation>()
  const [stateToken, setStateToken] = useState<string | null>(null)

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
      user,
      isLoggedIn,
      logout,
    }),
    [stateToken, setToken],
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
