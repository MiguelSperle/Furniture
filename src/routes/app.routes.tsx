import AuthenticatedRoutes from '../routes/stack/AuthenticatedRoutes'
import UnauthenticatedRoutes from '../routes/stack/UnauthenticatedRoutes'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser'

export default function AppRoutes() {
  const { session } = useAuthenticatedUser()

  return (
    <NavigationContainer>
      {session.signed ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    </NavigationContainer>
  )
}
