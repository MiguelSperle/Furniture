import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Toda vez que focar em uma janela(tela), ele refaz a requisição, passando false, evita requisição a mais
      staleTime: 1000 * 60 * 30, // 30 segundos, a cada 30 segundos ele faz a requisição novamente
    },
  },
})
