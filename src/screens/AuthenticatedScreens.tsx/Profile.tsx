import { SafeAreaView, Image, View, Alert, Platform } from 'react-native'
import Typography from '../../components/Typography'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContextUser } from '../../contexts/auth/AuthContext'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import {
  AutheticatedRoutesNavigationProps,
  RoutesNavigationType,
} from '../../interfaces/Authenticated.interface'
import * as SecureStore from 'expo-secure-store'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

export default function Profile() {
  const { authenticatedUserInfo, setAuthenticadedUserInfo, setSession } =
    useContext(AuthContextUser)

  const navigation = useNavigation<AutheticatedRoutesNavigationProps>()

  async function handleLogOutPress() {
    await SecureStore.deleteItemAsync('authenticatedUser')
    setAuthenticadedUserInfo([])

    return setSession({
      signed: false,
    })
  }

  function handleLogOut() {
    return Alert.alert(
      'Confirmação',
      'Você tem certeza que deseja realizar esta operação?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        { text: 'Sim', onPress: handleLogOutPress },
      ],
      { cancelable: false },
    )
  }

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setInterval(() => {
      setLoading(true)
    }, 2000)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, position: 'relative' }}>
        <Image
          source={require('../../../assets/space.jpg')}
          style={{
            width: '100%',
            height: Platform.OS === 'ios' ? 400 : 340,
            resizeMode: 'cover',
          }}
          alt=""
        />

        {authenticatedUserInfo.map((userInfo) => {
          return (
            <View
              key={userInfo.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                position: 'relative',
                bottom: 120,
              }}
            >
              <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                shimmerStyle={{
                  borderRadius: 100,
                  width: 170,
                  height: 170,
                  marginTop: 15,
                }}
                visible={loading}
              >
                <Image
                  source={{ uri: userInfo.imageUrl }}
                  style={{ width: 170, height: 170, borderRadius: 100 }}
                  alt=""
                />
              </ShimmerPlaceholder>

              <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                shimmerStyle={{
                  borderRadius: 10,
                  width: 170,
                  height: 38,
                  marginTop: 15,
                }}
                visible={loading}
              >
                <Typography text={userInfo.name} size={30} color="#000" />
              </ShimmerPlaceholder>
            </View>
          )
        })}

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 15,
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}
        >
          <Button
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              borderBottomWidth: 0.5,
              paddingHorizontal: 40,
              marginHorizontal: 10,
              paddingBottom: 15,
            }}
            onPress={() =>
              navigation.navigate(RoutesNavigationType.FavoritesProductsScreen)
            }
          >
            <Icon name="heart-outline" size={25} />
            <Typography text="Favorites" size={20} color="#000" />
          </Button>

          <Button
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              borderBottomWidth: 0.5,
              paddingHorizontal: 40,
              marginHorizontal: 10,
              paddingBottom: 15,
            }}
            onPress={handleLogOut}
          >
            <Icon name="log-out-outline" size={25} />
            <Typography text="Logout" size={20} color="#000" />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}
