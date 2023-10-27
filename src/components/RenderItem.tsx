import Typography from './Typography'
import { View, Image } from 'react-native'
import { Products } from '../interfaces/GlobalTypes.interface'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from './Button'
import { useNavigation } from '@react-navigation/native'
import {
  AutheticatedRoutesNavigationProps,
  RoutesNavigationType,
} from '../interfaces/Authenticated.interface'
import { useContext, useEffect, useState } from 'react'
import { AuthContextUseProduct } from '../contexts/provider/useProducts'
import { LinearGradient } from 'expo-linear-gradient'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'

export default function RenderItem({
  id,
  name,
  price,
  imageUrl,
  productSlug,
}: Products) {
  const navigation = useNavigation<AutheticatedRoutesNavigationProps>()

  const { addCartProduct } = useContext(AuthContextUseProduct)

  const [loadingRender, setLoadingRender] = useState<boolean>(false)

  useEffect(() => {
    setInterval(() => {
      setLoadingRender(true)
    }, 2000)
  }, [])

  return (
    <ShimmerPlaceholder
      LinearGradient={LinearGradient}
      shimmerStyle={{
        borderRadius: 15,
        width: 186,
        height: 250,
        marginHorizontal: 6,
      }}
      visible={loadingRender}
    >
      <Button
        style={{
          width: 186,
          height: 250,
          backgroundColor: '#c4d6e5',
          borderRadius: 15,
          display: 'flex',
          flexDirection: 'column',
          marginHorizontal: 6,
        }}
        onPress={() =>
          navigation.navigate(RoutesNavigationType.ProductsDetailsScreen, {
            slug: `${productSlug}`,
          })
        }
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 5,
          }}
        >
          <Image
            source={{ uri: imageUrl }}
            style={{ width: '100%', height: '100%', borderRadius: 15 }}
            alt=""
            resizeMode="cover"
          />
        </View>

        <View
          style={{
            paddingLeft: 10,
            paddingBottom: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <Typography
            text={name}
            size={22}
            color="#000"
            style={{ fontWeight: 'bold' }}
          />
          <Typography text="Product" size={14} color="gray" />
          <Typography
            text={`$${price.toFixed(2)}`}
            size={18}
            color="#000"
            style={{ fontWeight: 'bold' }}
          />
        </View>

        <Button
          style={{ position: 'absolute', bottom: 5, right: 5 }}
          onPress={() =>
            addCartProduct({
              id,
              name,
              price,
              imageUrl,
              amount: 1,
              productSlug,
            })
          }
        >
          <Icon name="add-circle" size={35} color="#000" />
        </Button>
      </Button>
    </ShimmerPlaceholder>
  )
}
