// Um Custom Hook é uma função cujo nome começa com ”use” e que pode utilizar outros Hooks, como o useEffect, por exemplo.
import { useContext, useEffect } from 'react'
import { AuthContextUser } from '../contexts/auth/AuthContext'
import * as SecureStore from 'expo-secure-store'

export function useAuthenticatedUser() {
  const {
    setSession,
    session,
    authenticatedUserInfo,
    setAuthenticadedUserInfo,
  } = useContext(AuthContextUser)

  useEffect(() => {
    async function AuthenticatedUserRoute() {
      try {
        const user = await SecureStore.getItemAsync('authenticatedUser')
        if (authenticatedUserInfo.length > 0) {
          console.log(JSON.stringify(authenticatedUserInfo, null, 2))
          return setSession({
            signed: true,
          })
        } else if (user !== null) {
          const userInfo = JSON.parse(user)
          setAuthenticadedUserInfo([userInfo])

          return setSession({
            signed: true,
          })
        }
      } catch (error) {
        console.log('Error at verify' + error)
      }
    }
    AuthenticatedUserRoute()
  }, [])

  return {
    session,
  }
}
