import { SafeAreaView, View } from 'react-native'
import Button from '../../components/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { AutheticatedRoutesNavigationProps } from '../../interfaces/Authenticated.interface'
import ProductsFlatList from '../../components/ProductsFlatList'
import Typography from '../../components/Typography'
import { useStorageCheckFavoriteProduct } from '../../hooks/useStorageCheckFavoriteProduct'

export default function FavoritesProducts() {
  const { myFavoritesProducts } = useStorageCheckFavoriteProduct()

  const navigation = useNavigation<AutheticatedRoutesNavigationProps>()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            padding: 20,
          }}
        >
          <Button onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-circle" size={35} />
          </Button>
        </View>

        {myFavoritesProducts.length > 0 ? (
          <ProductsFlatList
            myFavoritesProducts={myFavoritesProducts}
            isFavoritesProducts="isFavoritesProducts"
          />
        ) : (
          <Typography
            text="None favorite product"
            size={18}
            color="#000"
            style={{ textAlign: 'center' }}
          />
        )}
      </View>
    </SafeAreaView>
  )
}
