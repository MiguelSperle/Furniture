// Um Custom Hook é uma função cujo nome começa com ”use” e que pode utilizar outros Hooks, como o useEffect, por exemplo.
import { useMutation } from '@tanstack/react-query'
import { LoginUserService } from '../services/LoginUserService'
import { useContext, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { AuthContextUser } from '../contexts/auth/AuthContext'
import { ApiErrorType } from '../interfaces/GlobalTypes.interface'

export function useLoginUserMutation() {
  const { isSuccess, data, error, mutate } = useMutation(
    LoginUserService.PostService,
  )

  const { setSession, setAuthenticadedUserInfo, authenticatedUserInfo } =
    useContext(AuthContextUser)

  useEffect(() => {
    if (isSuccess && data) {
      SecureStore.setItemAsync('token', data.token)
      SecureStore.setItemAsync('refreshTokenId', data.refreshTokenId)
      SecureStore.setItemAsync(
        'authenticatedUser',
        JSON.stringify(data.authenticatedUser),
      )

      setAuthenticadedUserInfo([data.authenticatedUser])

      return setSession({
        signed: true,
      })
    }
  }, [
    isSuccess,
    data,
    setSession,
    setAuthenticadedUserInfo,
    authenticatedUserInfo,
  ])

  useEffect(() => {
    if (error) {
      const apiError = error as ApiErrorType
      return alert(apiError.message)
    }
  }, [error])

  return mutate
}
