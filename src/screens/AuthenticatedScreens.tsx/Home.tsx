import {
  SafeAreaView,
  TextInput,
  ScrollView,
  View,
  Platform,
} from 'react-native'
import Typography from '../../components/Typography'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import {
  AutheticatedRoutesNavigationProps,
  RoutesNavigationType,
} from '../../interfaces/Authenticated.interface'
import CarouselComponent from '../../components/Carousel'
import HeaderSecond from '../../components/HeaderSecond'
import ProductsFlatList from '../../components/ProductsFlatList'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'

export default function Home() {
  const navigation = useNavigation<AutheticatedRoutesNavigationProps>()

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setInterval(() => {
      setLoading(true)
    }, 2500)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <Header />
        <ScrollView>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginHorizontal: 12,
              marginTop: 20,
            }}
          >
            <Typography
              text="Find The Most"
              size={38}
              color="#000"
              style={{ fontWeight: 'bold' }}
            />

            <Typography
              text="Luxurious Furniture"
              size={38}
              color="#243d40"
              style={{ fontWeight: 'bold' }}
            />
          </View>

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
                name="search"
                size={24}
                color="gray"
                style={{ paddingHorizontal: 20 }}
              />
            </Button>
            <View style={{ flex: 1, backgroundColor: '#dbeeff' }}>
              <TextInput
                editable={Platform.OS !== 'ios'}
                value=""
                onPressIn={() =>
                  navigation.navigate(RoutesNavigationType.SearchScreen)
                }
                placeholder="What are you looking for"
                style={{ width: '100%', height: '100%' }}
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
              >
                <Icon name="camera" size={25} color="#fff" />
              </Button>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 9,
            }}
          >
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              shimmerStyle={{
                borderRadius: 15,
                width: '100%',
                height: 230,
                marginTop: 15,
              }}
              visible={loading}
            >
              <CarouselComponent />
            </ShimmerPlaceholder>
          </View>

          <HeaderSecond />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 9,
              marginBottom: 10,
            }}
          >
            <ProductsFlatList isHorizontalFlatItem="isHorizontalFlatItem" />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
