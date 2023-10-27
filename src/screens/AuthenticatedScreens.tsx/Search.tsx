import React, { useState } from 'react'
import { SafeAreaView, TextInput, View, Image, Platform } from 'react-native'
import { useGetProducts } from '../../hooks/useGetProducts'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../components/Button'
import { Products } from '../../interfaces/GlobalTypes.interface'
import ProductsFlatList from '../../components/ProductsFlatList'

export default function Search() {
  const { data } = useGetProducts()

  const [searchKey, setSearchKey] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Products[]>([])

  function handleSearch() {
    const filterProducts = data?.filter(
      (product: Products) =>
        product.name
          .toLowerCase()
          .normalize('NFD') // esse normalize vai desconsiderar todos os acentos de todas as palavras
          .replace(/[\u0300-\u036f]/g, '') === searchKey.toLowerCase().trim(), // esse trim vai desconsiderar qualquer tipo de espaço, tanto na frente quanto atrás
    )

    setSearchResults(filterProducts)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            backgroundColor: '#dbeeff',
            height: 55,
            borderRadius: 20,
            marginHorizontal: 12,
          }}
        >
          <Button>
            <Icon
              name="camera"
              size={24}
              color="gray"
              style={{ paddingHorizontal: 20 }}
            />
          </Button>
          <View style={{ flex: 1, backgroundColor: '#dbeeff' }}>
            <TextInput
              placeholder="What are you looking for"
              style={{ width: '100%', height: '100%' }}
              value={searchKey}
              onChangeText={setSearchKey}
            />
          </View>
          <View>
            <Button
              style={{
                width: 60,
                height: '100%',
                borderRadius: 20,
                backgroundColor: '#29464a',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handleSearch}
            >
              <Icon name="search" size={25} color="#fff" />
            </Button>
          </View>
        </View>

        {searchResults?.length === 0 ? (
          <View
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Image
              source={require('../../../assets/Pose23.png')}
              style={{
                width: 400,
                height: 550,
                resizeMode: 'cover',
                right: 30,
                top: Platform.OS === 'android' ? 24 : 50,
              }}
              alt=""
            />
          </View>
        ) : (
          <View
            style={{
              marginTop: 20,
            }}
          >
            <ProductsFlatList
              isSearchItem="isSearchItem"
              searchResults={searchResults}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}
