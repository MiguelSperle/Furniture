// ROTAS PARA QUANDO O USUARIO TIVER LOGADO/AUTENTICADO
import { NavigationProp, ParamListBase } from '@react-navigation/native'

export enum RoutesNavigationType { // rotas
  HomeScreen = 'Home',
  SearchScreen = 'Search',
  ProfileScreen = 'Profile',
  ProductsDetailsScreen = 'ProductsDetails',
  NewRivalsScreen = 'NewRivals',
  CartScreen = 'Cart',
  FavoritesProductsScreen = 'FavoritesProducts',
  PaymentProductScreen = 'PaymentProduct',
}

export interface AutheticatedRoutesNavigationPages extends ParamListBase {
  [RoutesNavigationType.HomeScreen]: undefined
  [RoutesNavigationType.SearchScreen]: undefined
  [RoutesNavigationType.ProfileScreen]: undefined
  [RoutesNavigationType.ProductsDetailsScreen]: {
    // onde vai receber o slug
    slug: string
  }
  [RoutesNavigationType.NewRivalsScreen]: undefined
  [RoutesNavigationType.CartScreen]: undefined
  [RoutesNavigationType.FavoritesProductsScreen]: undefined
  [RoutesNavigationType.PaymentProductScreen]: {
    slug?: string
  }
}
export type AutheticatedRoutesNavigationProps =
  NavigationProp<AutheticatedRoutesNavigationPages>
