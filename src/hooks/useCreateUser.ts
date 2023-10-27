// Um Custom Hook é uma função cujo nome começa com ”use” e que pode utilizar outros Hooks, como o useEffect, por exemplo.
import { useMutation } from '@tanstack/react-query'
import { CreateUserService } from '../services/CreateUserService'
import { useEffect } from 'react'
import { ApiErrorType } from '../interfaces/GlobalTypes.interface'

export function useCreateUserMutation() {
  const { isSuccess, data, error, mutate } = useMutation(
    CreateUserService.PostService,
  )

  useEffect(() => {
    if (isSuccess && data) {
      return alert(data.message)
    }
  }, [data, isSuccess])

  useEffect(() => {
    if (error) {
      const apiError = error as ApiErrorType
      return alert(apiError.message)
    }
  }, [error])

  return mutate
}
