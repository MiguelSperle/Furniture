import React, { ReactNode, createContext, useState } from 'react'
import { Products } from '../../interfaces/GlobalTypes.interface'
import * as SecureStore from 'expo-secure-store'

const DEFAULT_VALUE = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCartProducts: () => {},
  cartProducts: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addCartProduct: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeCartProduct: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMyFavoritesProducts: () => {},
  myFavoritesProducts: [],
}

interface ProviderProps {
  children: ReactNode
}

export interface ProductCart {
  id: string
  name: string
  price: number
  imageUrl: string
  amount: number
  productSlug: string
}

interface PropsUserContext {
  cartProducts: ProductCart[]
  setCartProducts: React.Dispatch<React.SetStateAction<ProductCart[]>>
  myFavoritesProducts: Products[]
  setMyFavoritesProducts: React.Dispatch<React.SetStateAction<Products[]>>
  addCartProduct: (product: ProductCart) => void
  removeCartProduct: (id: string) => void
}

const AuthContextUseProduct = createContext<PropsUserContext>(DEFAULT_VALUE)

export const AuthProviderUseProducts: React.FC<ProviderProps> = ({
  children,
}) => {
  const [cartProducts, setCartProducts] = useState<ProductCart[]>(
    DEFAULT_VALUE.cartProducts,
  ) // Aqui eu guardo os itens que o usuario escolheu para comprar

  const [myFavoritesProducts, setMyFavoritesProducts] = useState<Products[]>(
    DEFAULT_VALUE.myFavoritesProducts,
  )

  async function addCartProduct({
    id,
    name,
    price,
    imageUrl,
    amount,
    productSlug,
  }: ProductCart) {
    const verificationExistsProduct = cartProducts.find(
      (product: ProductCart) => product.id === id,
    )

    if (verificationExistsProduct) {
      // Atualizando array de objetos
      const updatedAmountCartProduct = cartProducts.map((product) => {
        if (product.id === id) {
          // Se encontrar o produto pelo ID, atualize apenas o amount e deixa o resto normal
          if (amount > 1) {
            // se o amount for maior que 1 ou seja de 2 pra cima
            return {
              ...product, // mantendo o que já tinha
              amount: product.amount + amount, // altera apenas o amount
            }
          }
          return {
            ...product, // mantendo o que já tinha
            amount: product.amount + 1, // altera apenas o amount
          }
        }
        // Se não  retornar o produto normal
        return product
      })

      await SecureStore.setItemAsync(
        'cartProduct',
        JSON.stringify(updatedAmountCartProduct),
      )

      setCartProducts(updatedAmountCartProduct)

      if (amount > 1) {
        return alert('Foi adicionado mais algumas unidades ao seu carrinho')
      } else {
        return alert('Foi adiconado mais uma unidade ao seu carrinho')
      }
    }

    await SecureStore.setItemAsync(
      'cartProduct',
      JSON.stringify([
        ...cartProducts,
        { id, name, price, imageUrl, amount, productSlug },
      ]),
    )

    setCartProducts([
      ...cartProducts,
      { id, name, price, imageUrl, amount, productSlug },
    ])

    return alert('Item adicionado ao seu carrinho')
  }

  async function removeCartProduct(id: string) {
    const remaining = cartProducts.filter((product) => product.id !== id)
    await SecureStore.setItemAsync('cartProduct', JSON.stringify(remaining))
    return setCartProducts(remaining)
  }

  return (
    <AuthContextUseProduct.Provider
      value={{
        cartProducts,
        setCartProducts,
        addCartProduct,
        removeCartProduct,
        myFavoritesProducts,
        setMyFavoritesProducts,
      }}
    >
      {children}
    </AuthContextUseProduct.Provider>
  )
}

export { AuthContextUseProduct }
