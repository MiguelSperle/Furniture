import React, { ReactNode, createContext, useState } from 'react'
import { DataAuthenticatedUserType } from '../../interfaces/GlobalTypes.interface'

const DEFAULT_VALUE = {
  session: {
    signed: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSession: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuthenticadedUserInfo: () => {},
  authenticatedUserInfo: [],
}

interface ProviderProps {
  children: ReactNode
}

interface PropsUserContext {
  authenticatedUserInfo: DataAuthenticatedUserType[]
  setAuthenticadedUserInfo: React.Dispatch<
    React.SetStateAction<DataAuthenticatedUserType[]>
  >

  session: {
    signed: boolean
  }
  setSession: React.Dispatch<
    React.SetStateAction<{
      signed: boolean
    }>
  >
}

const AuthContextUser = createContext<PropsUserContext>(DEFAULT_VALUE)

export const AuthProviderAuthenticationUser: React.FC<ProviderProps> = ({
  children,
}) => {
  const [session, setSession] = useState(DEFAULT_VALUE.session) // Aqui eu faço a autenticação se for true (logado) se não, (não logado)
  const [authenticatedUserInfo, setAuthenticadedUserInfo] = useState<
    DataAuthenticatedUserType[]
  >(DEFAULT_VALUE.authenticatedUserInfo) // Aqui eu guardo as informações do usuario

  return (
    <AuthContextUser.Provider
      value={{
        session,
        setSession,
        authenticatedUserInfo,
        setAuthenticadedUserInfo,
      }}
    >
      {children}
    </AuthContextUser.Provider>
  )
}

export { AuthContextUser }
