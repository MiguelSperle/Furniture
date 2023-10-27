import { View, Image } from 'react-native'
import { Products } from '../interfaces/GlobalTypes.interface'
import Button from './Button'
import Typography from './Typography'
import {
  AutheticatedRoutesNavigationProps,
  RoutesNavigationType,
} from '../interfaces/Authenticated.interface'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'
import { useState, useEffect } from 'react'

export default function RenderSearchFavoriteItem({
  name,
  price,
  imageUrl,
  productSlug,
}: Products) {
  const navigation = useNavigation<AutheticatedRoutesNavigationProps>()

  const [loadingRender, setLoadingRender] = useState<boolean>(false)

  useEffect(() => {
    setInterval(() => {
      setLoadingRender(true)
    }, 2000)
  }, [])

  return (
    <Button
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        padding: 20,
        backgroundColor: '#fff',
      }}
      onPress={() =>
        navigation.navigate(RoutesNavigationType.ProductsDetailsScreen, {
          slug: `${productSlug}`,
        })
      }
    >
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        shimmerStyle={{
          borderRadius: 20,
          width: 100,
          height: 80,
        }}
        visible={loadingRender}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 100, height: 80, borderRadius: 20 }}
          alt=""
        />
      </ShimmerPlaceholder>

      <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerStyle={{
            borderRadius: 10,
            width: 100,
            height: 28,
          }}
          visible={loadingRender}
        >
          <Typography
            text={name}
            size={20}
            color="#000"
            style={{ fontWeight: 'bold' }}
          />
        </ShimmerPlaceholder>

        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerStyle={{
            borderRadius: 10,
            width: 100,
            height: 34,
          }}
          visible={loadingRender}
        >
          <View>
            <Typography text="Product" size={15} color="#b0afb1" />
            <Typography
              text={`$${price.toFixed(2)}`}
              size={15}
              color="#b0afb1"
            />
          </View>
        </ShimmerPlaceholder>
      </View>
    </Button>
  )
}
