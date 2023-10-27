import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import IconSimple from 'react-native-vector-icons/SimpleLineIcons'
import Button from '../../components/Button'
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import {
  AutheticatedRoutesNavigationPages,
  AutheticatedRoutesNavigationProps,
  RoutesNavigationType,
} from '../../interfaces/Authenticated.interface'
import { useGetProducts } from '../../hooks/useGetProducts'
import { Products } from '../../interfaces/GlobalTypes.interface'
import Typography from '../../components/Typography'
import * as SecureStore from 'expo-secure-store'
import { AuthContextUseProduct } from '../../contexts/provider/useProducts'
import { LinearGradient } from 'expo-linear-gradient'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'
import { useStorageCheckCartProduct } from '../../hooks/useStorageCheckCartProduct'

type IProductDetailsScreenProps = RouteProp<
  AutheticatedRoutesNavigationPages,
  RoutesNavigationType.ProductsDetailsScreen
>

export default function ProductsDetails({
  route,
}: {
  route?: IProductDetailsScreenProps
}) {
  const { addCartProduct, setMyFavoritesProducts, myFavoritesProducts } =
    useContext(AuthContextUseProduct)

  const { cartProducts } = useStorageCheckCartProduct()

  const slug = route?.params.slug

  const navigation = useNavigation<AutheticatedRoutesNavigationProps>()

  const { data } = useGetProducts()

  const productSelected: Products = data.find(
    (product: Products) => product.productSlug === slug,
  )

  const [amountProduct, setAmountProduct] = useState<number>(1)

  const [favorites, setFavorites] = useState<string[]>([]) // onde guardo os id que foram salvos dos produtos com coração ativado

  useFocusEffect(
    useCallback(() => {
      async function getFavoriteProduct() {
        const favoritesStorage = await SecureStore.getItemAsync(
          'idFavoriteProduct',
        ) // Pegando os ids que tem salvo no storage

        const favoritesParse = JSON.parse(favoritesStorage ?? '[]') // tirando de json com json.parse, para usar métodos de array, e dentro dele se existir vai retornar o favoritesStorage, se não vai retornar um array vazio
        setFavorites(favoritesParse) // esse ?? === ||
      }
      getFavoriteProduct()
    }, []),
  )

  async function handleFavoriteProduct(productSelected: Products) {
    if (favorites.includes(productSelected.id)) {
      // verificando se no estado se existe um id que seja igual o id que eu enviei

      setMyFavoritesProducts(
        myFavoritesProducts.filter(
          (product) => product.id !== productSelected.id,
        ),
      ) // se tiver, retornar uma lista com todos os produtos menos o que eu produto do id que eu enviei, (seria um delete))

      await SecureStore.setItemAsync(
        'myFavoriteProduct',
        JSON.stringify(
          myFavoritesProducts.filter(
            (product) => product.id !== productSelected.id,
          ),
        ),
      )

      setFavorites(
        favorites.filter(
          (idProduct: string) => idProduct !== productSelected.id,
        ),
      ) // se tiver, retornar uma lista com todos os ids menos o que eu enviei, (seria um delete)

      return await SecureStore.setItemAsync(
        // atualizo no storage

        'idFavoriteProduct',
        JSON.stringify(
          favorites.filter(
            (idProduct: string) => idProduct !== productSelected.id,
          ),
        ),
      )
    }

    await SecureStore.setItemAsync(
      'myFavoriteProduct',
      JSON.stringify([...myFavoritesProducts, productSelected]),
    )

    await SecureStore.setItemAsync(
      // atualizo no storage
      'idFavoriteProduct',
      JSON.stringify([...favorites, productSelected.id]),
    )

    setMyFavoritesProducts([...myFavoritesProducts, productSelected])
    setFavorites([...favorites, productSelected.id])
  }

  function increment(clicked: string) {
    if (clicked === 'plusProduct') {
      setAmountProduct(amountProduct + 1)
    } else if (clicked === 'minusProduct') {
      if (amountProduct > 1) {
        setAmountProduct(amountProduct - 1)
      }
    }
  }

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setInterval(() => {
      setLoading(true)
    }, 1600)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 10,
            position: 'absolute',
            zIndex: 9999,
            width: '92%',
          }}
        >
          <Button onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-circle" size={35} />
          </Button>

          <Button onPress={() => handleFavoriteProduct(productSelected)}>
            <Icon
              name="heart"
              size={35}
              color={favorites.includes(productSelected.id) ? 'red' : '#204245'}
            />
          </Button>
        </View>

        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerStyle={{
            width: '100%',
            height: 410,
          }}
          visible={loading}
        >
          <Image
            source={{ uri: productSelected.imageUrl }}
            style={{ aspectRatio: 1, resizeMode: 'cover' }}
            alt=""
          />
        </ShimmerPlaceholder>

        <ScrollView
          style={{
            marginTop: -12,
            borderTopRightRadius: 18,
            borderTopLeftRadius: 18,
            backgroundColor: '#faf9fc',
          }}
        >
          <View
            style={{
              backgroundColor: '#faf9fc',
              height: '100%',
              borderTopRightRadius: 18,
              borderTopLeftRadius: 18,
              display: 'flex',
              flexDirection: 'column',
              gap: 25,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginTop: 20,
                // top: 20
              }}
            >
              <View
                style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
              >
                <ShimmerPlaceholder
                  LinearGradient={LinearGradient}
                  shimmerStyle={{
                    width: '80%',
                    height: 35,
                    borderRadius: 10,
                  }}
                  visible={loading}
                >
                  <Typography
                    text={productSelected.name}
                    size={25}
                    color="#000"
                    style={{ fontWeight: 'bold' }}
                  />
                </ShimmerPlaceholder>

                <ShimmerPlaceholder
                  LinearGradient={LinearGradient}
                  shimmerStyle={{
                    width: '50%',
                    height: 35,
                    borderRadius: 10,
                  }}
                  visible={loading}
                >
                  <Typography
                    text={`Stock ${productSelected.InStock}`}
                    size={16}
                    color="#000"
                  />
                </ShimmerPlaceholder>
              </View>
              <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                shimmerStyle={{
                  width: '40%',
                  height: 50,
                  borderRadius: 30,
                }}
                visible={loading}
              >
                <View
                  style={{
                    backgroundColor: '#e3effe',
                    padding: 10,
                    borderRadius: 30,
                  }}
                >
                  <Typography
                    text={`$ ${productSelected.price.toFixed(2)}`}
                    size={22}
                    color="#000"
                    style={{ fontWeight: 'bold' }}
                  />
                </View>
              </ShimmerPlaceholder>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                {[1, 2, 3, 4, 5].map((index) => {
                  return <Icon name="star" size={24} color="gold" key={index} />
                })}
                <Typography text="5.0" size={20} color="gray" />
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Button onPress={() => increment('plusProduct')}>
                  <IconSimple name="plus" size={30} />
                </Button>

                <Typography text={amountProduct} size={18} color="#000" />

                <Button onPress={() => increment('minusProduct')}>
                  <IconSimple name="minus" size={30} />
                </Button>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 7,
                marginHorizontal: 22,
              }}
            >
              <Typography text="Description" size={20} color="#000" />

              <Typography
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                size={15}
                color="#000"
                style={{ textAlign: 'justify' }}
              />
            </View>

            <View
              style={{
                backgroundColor: '#c7d9e9',
                marginHorizontal: 20,
                borderRadius: 30,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 40,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Icon name="location-outline" size={20} color="#000" />
                <Typography text="Dallas" size={16} color="#000" />
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Icon name="car" size={20} color="#000" />
                <Typography text="Free Delivery" size={16} color="#000" />
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginBottom: 10,
              }}
            >
              <Button
                style={{
                  backgroundColor: '#000',
                  width: 250,
                  height: 43,
                  borderRadius: 25,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() =>
                  addCartProduct({
                    id: productSelected.id,
                    name: productSelected.name,
                    price: productSelected.price,
                    imageUrl: productSelected.imageUrl,
                    amount: amountProduct,
                    productSlug: productSelected.productSlug,
                  })
                }
              >
                <Typography
                  text="BUY NOW"
                  size={18}
                  color="#fff"
                  style={{ fontWeight: 'bold', paddingLeft: 20 }}
                />
              </Button>

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
                      left: 24,
                      bottom: 30,
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
                  style={{
                    backgroundColor: '#000',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                  }}
                  onPress={() =>
                    navigation.navigate(RoutesNavigationType.CartScreen)
                  }
                >
                  <Icon name="cart" size={25} color="#fff" />
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
