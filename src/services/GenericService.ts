import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from 'axios'
import { BASE_URL } from '@env'
import * as SecureStore from 'expo-secure-store'
import { refreshTokenType } from '../interfaces/GlobalTypes.interface'

const commonOptions: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const api = axios.create(commonOptions)

// Os Interceptors do Axios são como middleware na hora da requisição e da resposta.
// "axios.interceptors.request" vai ser quando tu solicita e se tu utilizar o "axios.interceptors.response" vai ser na resposta.

// Intercptor feito para passar o token em todas as rotas automaticamente
api.interceptors.request.use(async function (
  config: InternalAxiosRequestConfig,
) {
  const token = await SecureStore.getItemAsync('token')

  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    } as InternalAxiosRequestConfig
  }

  return config
})

export const DEFAULT_ERROR_MESSAGES = {
  networkError: '📡 Network error, please try again later.',
} as const

// Intercptor feito para tratar os erros
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.code === AxiosError.ERR_NETWORK) {
      error.message = DEFAULT_ERROR_MESSAGES.networkError
      return Promise.reject(error)
    }

    if (error.response && error.response.data.message) {
      error.message = error.response.data.message
      return Promise.reject(error)
    }
  },
)

// Intercptor sobre refresh token
api.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error: AxiosError<any>) {
    const originalRequest: any = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (error.response?.data.message === '🔐 Token is invalid') {
        // Esse originalRequest._retry é é uma técnica comum para evitar problemas de loop infinito
        originalRequest._retry = true
        const refreshTokenId = await SecureStore.getItemAsync('refreshTokenId')

        // O token expira primeiro que o refreshTokenId
        await api
          .post('/refreshToken', {
            RefreshToken: refreshTokenId,
          })
          .then(async (response) => {
            const { refreshToken }: any = response.data // Se o refreshTokenId ainda nao tiver expirado ele me retornar apenas um novo token, se tiver expirado ele retornar um objeto com um novo refreshToken
            console.log('novo token ' + refreshToken)
            console.log(JSON.stringify(refreshToken, null, 2))

            if (refreshToken.id) {
              await SecureStore.deleteItemAsync('refreshTokenId')
              await SecureStore.setItemAsync('refreshTokenId', refreshToken.id)
              await api
                .post('/refreshToken', {
                  RefreshToken: refreshToken.id,
                })
                .then(async (response) => {
                  const { refreshToken }: refreshTokenType = response.data
                  console.log(refreshToken)
                  await SecureStore.deleteItemAsync('token')
                  await SecureStore.setItemAsync('token', refreshToken)

                  axios.defaults.headers.common.Authorization = `Bearer ${refreshToken}`
                })
              return
            }
            await SecureStore.deleteItemAsync('token')
            await SecureStore.setItemAsync('token', refreshToken)
            axios.defaults.headers.common.Authorization = `Bearer ${refreshToken}`
          })
      }
      return api(originalRequest)
    }
    return Promise.reject(error)
  },
)
