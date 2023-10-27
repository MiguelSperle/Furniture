// Um Custom Hook é uma função cujo nome começa com ”use” e que pode utilizar outros Hooks, como o useEffect, por exemplo.
import { useQuery } from '@tanstack/react-query'
import { GetProductsService } from '../services/GetProductsService'

export function useGetProducts() {
  const { data, isLoading, refetch } = useQuery(
    ['products'],
    GetProductsService.GetService,
  )

  return {
    data,
    isLoading,
    refetch,
  }
}
