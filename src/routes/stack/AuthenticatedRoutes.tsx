import { RoutesNavigationType } from '../../interfaces/Authenticated.interface'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductsDetails from '../../screens/AuthenticatedScreens.tsx/ProductsDetails'
import BottomTabNavigation from '../../navigation/BottomTabNavigation'
import NewRivals from '../../screens/AuthenticatedScreens.tsx/NewRivals'
import Cart from '../../screens/AuthenticatedScreens.tsx/Cart'
import FavoritesProducts from '../../screens/AuthenticatedScreens.tsx/FavoritesProducts'
import PaymentProduct from '../../screens/AuthenticatedScreens.tsx/PaymentProduct'
import { useAppState } from '../../hooks/useAppState'

const Stack = createNativeStackNavigator()

export default function AuthenticatedRoutes() {
  useAppState()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bottom Navigation"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={RoutesNavigationType.ProductsDetailsScreen}
        component={ProductsDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={RoutesNavigationType.NewRivalsScreen}
        component={NewRivals}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={RoutesNavigationType.CartScreen}
        component={Cart}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={RoutesNavigationType.PaymentProductScreen}
        component={PaymentProduct}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={RoutesNavigationType.FavoritesProductsScreen}
        component={FavoritesProducts}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
