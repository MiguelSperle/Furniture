import { SafeAreaView, View, Image, ScrollView } from 'react-native'
import Typography from '../../components/Typography'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../components/Button'
import { AuthContextUseProduct } from '../../contexts/provider/useProducts'
import { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  AutheticatedRoutesNavigationProps,
  RoutesNavigationType,
} from '../../interfaces/Authenticated.interface'
import { useStorageCheckCartProduct } from '../../hooks/useStorageCheckCartProduct'

export default function Cart() {
  const { removeCartProduct } = useContext(AuthContextUseProduct)

  const { cartProducts } = useStorageCheckCartProduct()

  const navigation = useNavigation<AutheticatedRoutesNavigationProps>()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
              padding: 20,
            }}
          >
            <Button onPress={() => navigation.goBack()}>
              <Icon name="chevron-back-circle" size={38} />
            </Button>

            <Typography
              text="Orders"
              size={27}
              color="#000"
              style={{ fontWeight: 'bold' }}
            />
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {cartProducts.map((product) => {
              return (
                <Button
                  onPress={() =>
                    navigation.navigate(
                      RoutesNavigationType.ProductsDetailsScreen,
                      {
                        slug: `${product.productSlug}`,
                      },
                    )
                  }
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 20,
                    padding: 20,
                    backgroundColor: '#fff',
                    paddingHorizontal: 20,
                  }}
                  key={product.id}
                >
                  <Image
                    source={{ uri: product.imageUrl }}
                    style={{ width: 100, height: 80, borderRadius: 20 }}
                    alt=""
                  />

                  <View
                    style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
                  >
                    <Typography
                      text={product.name}
                      size={20}
                      color="#000"
                      style={{ fontWeight: 'bold' }}
                    />
                    <View>
                      <Typography
                        text={`Amount: ${product.amount}`}
                        size={15}
                        color="#b0afb1"
                      />
                      <Typography
                        text={`$${product.price?.toFixed(2)}`}
                        size={15}
                        color="#b0afb1"
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 12,
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: '#254346',
                        padding: 15,
                        borderRadius: 40,
                        width: 55,
                      }}
                      onPress={() =>
                        navigation.navigate(
                          RoutesNavigationType.PaymentProductScreen,
                          { slug: `${product.productSlug}` },
                        )
                      }
                    >
                      <Typography
                        text="PAY"
                        size={12}
                        color="#fff"
                        style={{ textAlign: 'center' }}
                      />
                    </Button>

                    <Button onPress={() => removeCartProduct(product.id)}>
                      <Icon name="trash" size={27} color="#000" />
                    </Button>
                  </View>
                </Button>
              )
            })}
          </View>

          {cartProducts.length >= 2 && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                style={{
                  backgroundColor: '#0f72cf',
                  width: '90%',
                  height: 60,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                }}
                onPress={() =>
                  navigation.navigate(
                    RoutesNavigationType.PaymentProductScreen,
                    {
                      slug: '',
                    },
                  )
                }
              >
                <Typography
                  text="PAY ALL"
                  size={17}
                  color="#fff"
                  style={{ fontWeight: 'bold' }}
                />
              </Button>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
