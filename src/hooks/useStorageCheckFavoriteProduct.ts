// Um Custom Hook é uma função cujo nome começa com ”use” e que pode utilizar outros Hooks, como o useEffect, por exemplo.
import { useEffect, useContext } from 'react'
import * as SecureStore from 'expo-secure-store'
import { AuthContextUseProduct } from '../contexts/provider/useProducts'

export function useStorageCheckFavoriteProduct() {
  const { myFavoritesProducts, setMyFavoritesProducts } = useContext(
    AuthContextUseProduct,
  )

  useEffect(() => {
    async function StorageCheckFavoriteProduct() {
      const saveFavoriteProduct = await SecureStore.getItemAsync(
        'myFavoriteProduct',
      )

      if (myFavoritesProducts?.length > 0) {
        return console.log('existe produtos aqui nos favoritos')
      } else if (saveFavoriteProduct !== null) {
        const product = JSON.parse(saveFavoriteProduct ?? '[]')
        setMyFavoritesProducts(product)
      }
    }
    StorageCheckFavoriteProduct()
  }, []) // Se eu colocar algo dentro do array de dependencias significa que o useEffect será executado sempre que uma dessas dependências for alterada.

  return {
    myFavoritesProducts,
  }
}
