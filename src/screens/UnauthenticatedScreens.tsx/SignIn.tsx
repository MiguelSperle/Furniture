import { View, SafeAreaView, TextInput, Platform } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../../components/Button'
import zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactHookFormCreateORLoginUserType } from '../../interfaces/GlobalTypes.interface'
import Typography from '../../components/Typography'
import { useLoginUserMutation } from '../../hooks/useLoginUser'
import {
  RoutesNavigationType,
  UnauthenticatedRoutesNavigationProps,
} from '../../interfaces/Unauthenticated.interface'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view' // ScrollView para quando tiver que escrever no teclado
import Animated, { SlideInRight, SlideInUp } from 'react-native-reanimated'

export default function SignInScreen() {
  const navigation = useNavigation<UnauthenticatedRoutesNavigationProps>()

  const LoginUserMutation = useLoginUserMutation()

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  const loginFormSchema = zod.object({
    email: zod.string(),
    password: zod.string(),
  })

  const { control, handleSubmit, trigger } = useForm({
    resolver: zodResolver(loginFormSchema),
  })

  function handleSignIn(data: ReactHookFormCreateORLoginUserType) {
    try {
      LoginUserMutation({
        email: data.email,
        password: data.password,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 10,
            zIndex: 9999,
            position: 'absolute',
          }}
        >
          <Button onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-circle-outline" size={35} />
          </Button>
        </View>

        <Animated.Image
          source={require('../../../assets/bg-loginScreen.png')}
          style={{
            width: '100%',
            height: 400,
            resizeMode: 'center',
          }}
          alt=""
          entering={SlideInUp}
        />

        <Animated.View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            gap: 15,
          }}
          entering={SlideInRight}
        >
          <Typography
            text="Unlimited Luxurious Furniture"
            size={24}
            color="#2d4c4f"
            style={{ fontWeight: 'bold' }}
          />

          <Controller
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: 'Complete com um email válido.',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5,
                    width: '85%',
                  }}
                >
                  <Typography
                    color="#2d4c4f"
                    text="Email"
                    size={14}
                    style={{ textAlign: 'right', paddingHorizontal: 4 }}
                  />
                  <View style={{ position: 'relative' }}>
                    <Icon
                      name="md-mail-outline"
                      size={26}
                      color="#000"
                      style={{
                        position: 'absolute',
                        left: 12,
                        top: Platform.OS === 'ios' ? 18 : 14,
                        zIndex: 1000,
                      }}
                    />

                    <TextInput
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Enter Email"
                      placeholderTextColor="gray"
                      style={{
                        height: Platform.OS === 'ios' ? 66 : 55,
                        width: '100%',
                        borderRadius: 12,
                        backgroundColor: '#d3ebf7',
                        paddingLeft: 45,
                        color: '#2d4c4f',
                        fontSize: 15,
                        shadowColor: 'rgba(0, 0, 0, 0.4)', // Cor da sombra
                        shadowOffset: { width: 0, height: 7 }, // Offset da sombra (horizontal e vertical)
                        shadowOpacity: 2, // Opacidade da sombra
                        shadowRadius: 4, // Raio da sombra
                        elevation: 10,
                      }}
                      onKeyPress={() => {
                        trigger('email')
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
            name="email"
            defaultValue=""
          />

          <Controller
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: 'Complete com sua senha.',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5,
                    width: '85%',
                  }}
                >
                  <Typography
                    color="#2d4c4f"
                    text="Password"
                    size={14}
                    style={{ textAlign: 'right', paddingHorizontal: 4 }}
                  />
                  <View
                    style={{
                      position: 'relative',
                    }}
                  >
                    <Button
                      onPress={() => setPasswordVisible(!passwordVisible)}
                      style={{
                        position: 'absolute',
                        top: Platform.OS === 'ios' ? 19 : 14,
                        right: 16,
                        zIndex: 1000,
                      }}
                    >
                      <Icon
                        name={
                          passwordVisible
                            ? 'md-eye-outline'
                            : 'md-eye-off-outline'
                        }
                        size={30}
                        color="#000"
                      />
                    </Button>

                    <Icon
                      name="md-lock-closed-outline"
                      size={26}
                      color="#000"
                      style={{
                        position: 'absolute',
                        left: 12,
                        top: Platform.OS === 'ios' ? 18 : 14,
                        zIndex: 1000,
                      }}
                    />

                    <TextInput
                      secureTextEntry={!passwordVisible}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Your passsword"
                      placeholderTextColor="gray"
                      style={{
                        height: Platform.OS === 'ios' ? 66 : 55,
                        width: '100%',
                        borderRadius: 12,
                        backgroundColor: '#d3ebf7',
                        paddingLeft: 45,
                        color: '#2d4c4f',
                        fontSize: 15,
                        shadowColor: 'rgba(0, 0, 0, 0.4)', // Cor da sombra
                        shadowOffset: { width: 0, height: 7 }, // Offset da sombra (horizontal e vertical)
                        shadowOpacity: 2, // Opacidade da sombra
                        shadowRadius: 4, // Raio da sombra
                        elevation: 10,
                      }}
                      onKeyPress={() => {
                        trigger('password')
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
            name="password"
            defaultValue=""
          />
        </Animated.View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          <Animated.View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            entering={SlideInRight}
          >
            <Button
              style={{
                backgroundColor: '#2d4c4f',
                width: '85%',
                height: 60,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
              }}
              onPress={handleSubmit(handleSignIn)}
            >
              <Typography
                text="LOGIN"
                size={20}
                color="#fff"
                style={{ fontWeight: 'bold' }}
              />
            </Button>
          </Animated.View>

          <Button
            onPress={() =>
              navigation.navigate(RoutesNavigationType.SignUpScreen)
            }
          >
            <Typography
              text="Do not have an account? Register"
              size={16}
              color="#2D4C4F"
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            />
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
