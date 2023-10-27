import { View, SafeAreaView, Platform, TextInput } from 'react-native'
import Button from '../../components/Button'
import { Controller, useForm } from 'react-hook-form'
import Icon from 'react-native-vector-icons/Ionicons'
import zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Typography from '../../components/Typography'
import { useCreateUserMutation } from '../../hooks/useCreateUser'
import { ReactHookFormCreateORLoginUserType } from '../../interfaces/GlobalTypes.interface'
import { UnauthenticatedRoutesNavigationProps } from '../../interfaces/Unauthenticated.interface'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import Animated, { SlideInRight, SlideInUp } from 'react-native-reanimated'

export default function SignUpScreen() {
  const navigation = useNavigation<UnauthenticatedRoutesNavigationProps>()

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  const CreateUserMutation = useCreateUserMutation()

  const registerFormSchema = zod.object({
    email: zod.string(),
    password: zod.string(),
    name: zod.string(),
  })

  // Usando o zod para validar o dados que o usuario vai inserir nos campos de preenchimento.
  const { control, handleSubmit, trigger } = useForm({
    resolver: zodResolver(registerFormSchema),
  })

  function handleSignUp(data: ReactHookFormCreateORLoginUserType) {
    try {
      CreateUserMutation({
        email: data.email,
        password: data.password,
        name: data.name,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
            gap: 24,
          }}
          entering={SlideInRight}
        >
          <Typography
            text="Sign up and start shopping"
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
                message: 'Complete com seu nome',
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
                    text="Username"
                    size={14}
                    style={{ textAlign: 'right', paddingHorizontal: 4 }}
                  />
                  <View style={{ position: 'relative' }}>
                    <Icon
                      name="ios-person-outline"
                      size={26}
                      color="#000"
                      style={{
                        position: 'absolute',
                        left: 12,
                        top: Platform.OS === 'ios' ? 18 : 13,
                        zIndex: 1000,
                      }}
                    />

                    <TextInput
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Username"
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
                        trigger('name')
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
            name="name"
            defaultValue=""
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
                        top: Platform.OS === 'ios' ? 18 : 13,
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
                message: 'Complete com uma senha válida.',
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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
            marginBottom: 20,
          }}
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
            onPress={handleSubmit(handleSignUp)}
          >
            <Typography
              text="SIGNUP"
              size={20}
              color="#fff"
              style={{ fontWeight: 'bold' }}
            />
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
