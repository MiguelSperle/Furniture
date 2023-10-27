import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Typography from './Typography'
import Button from './Button'
import { useNavigation } from '@react-navigation/native'
import {
  AutheticatedRoutesNavigationProps,
  RoutesNavigationType,
} from '../interfaces/Authenticated.interface'
import { useStorageCheckCartProduct } from '../hooks/useStorageCheckCartProduct'

export default function Header() {
  const navigation = useNavigation<AutheticatedRoutesNavigationProps>()

  const { cartProducts } = useStorageCheckCartProduct()

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        padding: 15,
      }}
    >
      <Icon name="map-pin" size={24} color="#000" />
      <Typography text="Shangai China" size={20} color="#000" />
      <View>
        {cartProducts.length > 0 && (
          <View
            style={{
              position: 'absolute',
              width: 18,
              height: 18,
              borderRadius: 50,
              backgroundColor: '#0f700b',
              zIndex: 9999,
              left: 10,
              bottom: 14,
            }}
          >
            <Typography
              text={cartProducts.length}
              size={13}
              color="#fff"
              style={{ textAlign: 'center' }}
            />
          </View>
        )}
        <Button
          onPress={() => navigation.navigate(RoutesNavigationType.CartScreen)}
        >
          <Icon name="shopping-bag" size={24} color="#000" />
        </Button>
      </View>
    </View>
  )
}
