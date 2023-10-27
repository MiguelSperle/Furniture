import React, { useContext, useState } from 'react'
import { SafeAreaView, ScrollView, TextInput, View } from 'react-native'
import {
  AuthContextUseProduct,
  ProductCart,
} from '../../contexts/provider/useProducts'

import Typography from '../../components/Typography'
import Button from '../../components/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import { RouteProp, useNavigation } from '@react-navigation/native'
import {
  AutheticatedRoutesNavigationPages,
  AutheticatedRoutesNavigationProps,
  RoutesNavigationType,
} from '../../interfaces/Authenticated.interface'
import MaskCreditCartInput from '../../utils/Masks/MaskCreditCardNumberInput'
import MaskPhoneNumberInput from '../../utils/Masks/MaskPhoneNumberInput'
import MaskDateExpirationCreditCardInput from '../../utils/Masks/MaskDateExpirationCreditCardInput'
import { AuthContextUser } from '../../contexts/auth/AuthContext'
import MaskCreditCardCVCInput from '../../utils/Masks/MaskCreditCardCVCInput'
import * as SecureStore from 'expo-secure-store'
import { useStorageCheckCartProduct } from '../../hooks/useStorageCheckCartProduct'

type IPaymentProductScreenProps = RouteProp<
  AutheticatedRoutesNavigationPages,
  RoutesNavigationType.PaymentProductScreen
>

interface personalInformationType {
  email?: string
  name?: string
}

export default function PaymentProduct({
  route,
}: {
  route?: IPaymentProductScreenProps
}) {
  const [personalInformation, setPersonalInformation] =
    useState<personalInformationType>({
      email: '',
      name: '',
    })

  const { setCartProducts } = useContext(AuthContextUseProduct)

  const { cartProducts } = useStorageCheckCartProduct()

  const { authenticatedUserInfo } = useContext(AuthContextUser)

  const slug = route?.params.slug

  const filterOnlyOneProduct: ProductCart | undefined = cartProducts.find(
    (product) => product.productSlug === slug,
  )

  const priceTotalOnlyOneProduct = filterOnlyOneProduct // Preço do item em especifico
    ? filterOnlyOneProduct.amount * filterOnlyOneProduct.price
    : 0

  const priceAllItens = cartProducts.map(
    // Se não tiver slug, não vai ter um item especifico para pagar, então vamos pagar TODOS juntos, pegamos o preço de TODOS os itens que estão no carrinho
    (product) => product.amount * product.price,
  )

  const priceReduceAllItens = priceAllItens.reduce(
    // E passamos no reduce para ir somando, (acc acumula os valores e cur é o valor atual, o cur vai somando no acc)
    (acc, cur) => acc + cur,
    0,
  )

  const navigation = useNavigation<AutheticatedRoutesNavigationProps>()

  const { MaskFormatCreditCardNumber, setCreditCardNumber } =
    MaskCreditCartInput()

  const { MaskFormatDateExpirationCreditCard, setDateExpirationCard } =
    MaskDateExpirationCreditCardInput()

  const { MaskFormatCreditCardCVC, setCreditCardCvC } = MaskCreditCardCVCInput()

  const { MaskFormatPhoneNumber, setPhoneNumberPersonal } =
    MaskPhoneNumberInput()

  async function handlePayProduct(slugLength: number) {
    const user = authenticatedUserInfo[0]

    if (
      personalInformation?.email === '' ||
      personalInformation?.name === '' ||
      MaskFormatCreditCardNumber.masked === '' ||
      MaskFormatDateExpirationCreditCard.masked === '' ||
      MaskFormatCreditCardCVC.masked === '' ||
      MaskFormatPhoneNumber.masked === ''
    ) {
      return alert('Preencha todos campos')
    } else if (
      personalInformation.email !== user.email ||
      personalInformation.name !== user.name
    ) {
      return alert('Email e/ou Senha não são registrados')
    } else if (
      // esse replace abaixo, está sendo usado para tirar letras e caracteres especiais e tira espaços também, deixa somente números
      personalInformation.email === user.email &&
      personalInformation.name === user.name &&
      MaskFormatCreditCardNumber.masked.replace(/\D/g, '').length === 16 &&
      MaskFormatDateExpirationCreditCard.masked.replace(/\D/g, '').length ===
        4 &&
      MaskFormatCreditCardCVC.masked.replace(/\D/g, '').length === 3 &&
      MaskFormatPhoneNumber.masked.replace(/\D/g, '').length === 11
    ) {
      setCartProducts([])
      alert('Pagamento efetuado com sucesso')
      setPersonalInformation({
        email: '',
        name: '',
      })
      setCreditCardNumber('')
      setDateExpirationCard('')
      setCreditCardCvC('')
      setPhoneNumberPersonal('')

      if (slugLength > 0) {
        // se tiver slug > 0, quer dizer que temos o slug, então vou pagar um item sozinho
        return await SecureStore.setItemAsync(
          // retorno todos os itens menos o item do id que está sendo pago
          'cartProduct',
          JSON.stringify(
            cartProducts.filter(
              (product) => product.id !== filterOnlyOneProduct?.id,
            ),
          ),
        )
      } else {
        // se não tiver slug, eu vou pagar todos os produtos
        return await SecureStore.deleteItemAsync('cartProduct')
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            padding: 20,
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-circle" size={38} />
          </Button>

          {slug ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Typography text="Price Total" size={18} color="#254346" />

              <Typography
                text={`$${priceTotalOnlyOneProduct.toFixed(2)}`}
                size={18}
                color="#b0afb1"
              />
            </View>
          ) : (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Typography text="Price Total" size={18} color="#254346" />

              <Typography
                text={`$${priceReduceAllItens.toFixed(2)}`}
                size={18}
                color="#b0afb1"
              />
            </View>
          )}
        </View>

        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Typography text="Email" size={14} color="#000" />
            <TextInput
              value={personalInformation.email}
              style={{
                height: 50,
                width: '100%',
                borderColor: 'gray',
                borderWidth: 0.5,
                paddingLeft: 10,
                borderRadius: 3,
              }}
              placeholder="Enter Email"
              placeholderTextColor="#b6b6b6"
              onChangeText={(email: string) => {
                // mantendo o que já tem dentro do estado e adicionando uma coisa nova
                setPersonalInformation((prevInfo) => ({
                  ...prevInfo,
                  email,
                }))
              }}
            />
          </View>

          <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Typography text="Card information" size={14} color="#000" />
            <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <TextInput
                value={MaskFormatCreditCardNumber.masked}
                style={{
                  height: 50,
                  width: '100%',
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  paddingLeft: 10,
                  borderRadius: 3,
                }}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                placeholderTextColor="#b6b6b6"
                keyboardType="numeric"
                onChangeText={(text: string) => {
                  setCreditCardNumber(text)
                }}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <TextInput
                  value={MaskFormatDateExpirationCreditCard.masked}
                  style={{
                    height: 50,
                    width: '50%',
                    borderColor: 'gray',
                    borderWidth: 0.5,
                    paddingLeft: 10,
                    borderTopLeftRadius: 1.5,
                    borderBottomLeftRadius: 1.5,
                  }}
                  placeholder="MM/YY"
                  placeholderTextColor="#b6b6b6"
                  keyboardType="numeric"
                  onChangeText={(text: string) => {
                    setDateExpirationCard(text)
                  }}
                />
                <TextInput
                  value={MaskFormatCreditCardCVC.masked}
                  style={{
                    height: 50,
                    width: '50%',
                    borderColor: 'gray',
                    borderWidth: 0.5,
                    paddingLeft: 10,
                    borderTopRightRadius: 1.5,
                    borderBottomRightRadius: 1.5,
                  }}
                  placeholder="CVC"
                  placeholderTextColor="#b6b6b6"
                  keyboardType="numeric"
                  onChangeText={(text: string) => {
                    setCreditCardCvC(text)
                  }}
                />
              </View>
            </View>
          </View>

          <View style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Typography text="Name on card" size={14} color="#000" />
              <TextInput
                value={personalInformation.name}
                style={{
                  height: 50,
                  width: '100%',
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  paddingLeft: 10,
                  borderRadius: 3,
                }}
                placeholder="Enter Name"
                placeholderTextColor="#b6b6b6"
                onChangeText={(name: string) => {
                  setPersonalInformation((prevInfo) => ({
                    // mantendo o que já tem dentro do estado e adicionando uma coisa nova
                    ...prevInfo,
                    name,
                  }))
                }}
              />
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Typography text="Cellphone Personal" size={14} color="#000" />
              <TextInput
                value={MaskFormatPhoneNumber.masked}
                style={{
                  height: 50,
                  width: '100%',
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  paddingLeft: 10,
                  borderRadius: 3,
                }}
                placeholder="(XX) XXXXX-XXXX"
                placeholderTextColor="#b6b6b6"
                keyboardType="numeric"
                onChangeText={(text: string) => setPhoneNumberPersonal(text)}
              />
            </View>

            <Button
              style={{
                backgroundColor: '#0f72cf',
                width: '100%',
                height: 60,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}
              onPress={() => handlePayProduct(slug?.length || 0)}
            >
              <Typography
                text="PAY"
                size={17}
                color="#fff"
                style={{ fontWeight: 'bold' }}
              />
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
