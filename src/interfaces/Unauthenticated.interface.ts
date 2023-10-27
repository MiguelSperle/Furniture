// ROTAS PARA QUANDO O USUARIO TIVER DESLOGADO
import { NavigationProp } from '@react-navigation/native'

export enum RoutesNavigationType { // rotas
  AccessScreen = 'AccessAlternative',
  SignInScreen = 'SignIn',
  SignUpScreen = 'SignUp',
}

export interface UnauthenticatedRoutesNavigationPages {
  [RoutesNavigationType.AccessScreen]: undefined
  [RoutesNavigationType.SignInScreen]: undefined
  [RoutesNavigationType.SignUpScreen]: undefined
}
export type UnauthenticatedRoutesNavigationProps =
  NavigationProp<UnauthenticatedRoutesNavigationPages>
