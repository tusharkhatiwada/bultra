import { createApi } from "api/createApi"
import { Api } from "api/domain/api"
import React, { FC, useContext } from "react"

export const ApiContext = React.createContext(null as unknown as Api)

type ApiProviderProps = {
  offline?: boolean
}

// @ts-ignore
export const ApiProvider: FC<ApiProviderProps> = ({ children, offline }) => {
  const api = createApi(offline || false)

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

export const useApi = () => {
  const context = useContext(ApiContext)

  if (context == null) {
    throw new Error("useApi must be used within an ApiProvider")
  }

  return context
}
