// Um Custom Hook é uma função cujo nome começa com ”use” e que pode utilizar outros Hooks, como o useEffect, por exemplo.
import { useEffect, useContext } from 'react'
import * as SecureStore from 'expo-secure-store'
import { AuthContextUseProduct } from '../contexts/provider/useProducts'

export function useStorageCheckCartProduct() {
  const { cartProducts, setCartProducts } = useContext(AuthContextUseProduct)

  useEffect(() => {
    async function StorageCheckCartProduct() {
      const saveProduct = await SecureStore.getItemAsync('cartProduct')

      if (cartProducts?.length > 0) {
        return console.log('existem produtos no cart')
      } else if (saveProduct !== null) {
        const product = JSON.parse(saveProduct ?? '[]')
        setCartProducts(product)
      }
    }
    StorageCheckCartProduct()
  }, []) // Se eu colocar algo dentro do array de dependencias significa que o useEffect será executado sempre que uma dessas dependências for alterada.

  return {
    cartProducts,
  }
}
