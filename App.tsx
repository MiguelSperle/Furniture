import React from 'react'
import AppRoutes from './src/routes/app.routes'
import { AuthProviderAuthenticationUser } from './src/contexts/auth/AuthContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './src/lib/QueryClient'
import { AuthProviderUseProducts } from './src/contexts/provider/useProducts'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProviderAuthenticationUser>
        <AuthProviderUseProducts>
          <AppRoutes />
        </AuthProviderUseProducts>
      </AuthProviderAuthenticationUser>
    </QueryClientProvider>
  )
}

// ver a parte do pagamento // CHECK
// ver a parte do loading
// subir no github
