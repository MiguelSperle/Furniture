import RenderItem from './RenderItem'
import { FlatList, View } from 'react-native'
import { useGetProducts } from '../hooks/useGetProducts'
import { Products } from '../interfaces/GlobalTypes.interface'
import RenderSearchFavoriteItem from './RenderSearchFavoriteItem'

interface PropsProductsFlatList {
  isHorizontalFlatItem?: string
  isColumnFlatItem?: string
  isSearchItem?: string
  searchResults?: Products[]
  isFavoritesProducts?: string
  myFavoritesProducts?: Products[]
}

export default function ProductsFlatList({
  isHorizontalFlatItem,
  isColumnFlatItem,
  isSearchItem,
  searchResults,
  isFavoritesProducts,
  myFavoritesProducts,
}: PropsProductsFlatList) {
  const { data } = useGetProducts()

  return (
    <>
      {isHorizontalFlatItem && (
        <View style={{ marginTop: 20, marginLeft: 10 }}>
          <FlatList
            data={data}
            renderItem={({ item }: { item: Products }) => (
              <RenderItem {...item} />
            )}
            keyExtractor={(item) => item.id}
            horizontal
          />
        </View>
      )}

      {isColumnFlatItem && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: Products }) => (
            <RenderItem {...item} />
          )}
          contentContainerStyle={{ rowGap: 30 }}
          numColumns={2}
        />
      )}

      {isSearchItem && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: Products }) => (
            <RenderSearchFavoriteItem {...item} />
          )}
        />
      )}

      {isFavoritesProducts && (
        <FlatList
          data={myFavoritesProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: Products }) => (
            <RenderSearchFavoriteItem {...item} />
          )}
        />
      )}
    </>
  )
}
// FLAT LIST SERIA UM MAP, SÓ QUE MAIS PERFOMATICO
