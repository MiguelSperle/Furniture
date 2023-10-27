import { View, Platform, SafeAreaView, Image } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import {
  RoutesNavigationType,
  UnauthenticatedRoutesNavigationProps,
} from '../../interfaces/Unauthenticated.interface'
import { useNavigation } from '@react-navigation/native'
import Typography from '../../components/Typography'

export default function Access() {
  const navigation = useNavigation<UnauthenticatedRoutesNavigationProps>()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <View
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 80,
        }}
      >
        <Image
          source={require('../../../assets/bg-firstScreen.png')}
          style={{
            width: '100%',
            height: Platform.OS === 'ios' ? '32%' : '34%',
          }}
          alt="imagem de bem vindo para a pessoa escolher sign in or sign up"
        />

        <View
          style={{
            width: '100%',
            height: '22%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginBottom: Platform.OS === 'ios' ? 0 : 25,
          }}
        >
          <Button
            style={{
              width: '90%',
              height: '37%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              backgroundColor: '#2d4c4f',
            }}
            onPress={() =>
              navigation.navigate(RoutesNavigationType.SignInScreen)
            }
          >
            <Typography color="#fff" text="Sign in" size={20} />
          </Button>

          <Button
            style={{
              borderColor: '#2d4c4f',
              borderWidth: 1,
              width: '90%',
              height: '37%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}
            onPress={() =>
              navigation.navigate(RoutesNavigationType.SignUpScreen)
            }
          >
            <Typography color="#000" text="Sign up" size={20} />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}
