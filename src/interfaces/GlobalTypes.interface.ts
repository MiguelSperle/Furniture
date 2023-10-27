export interface ReactHookFormCreateORLoginUserType {
  email?: string
  password?: string
  name?: string
}

export interface ApiErrorType {
  message: string
}

export interface refreshTokenType {
  refreshToken: string
}

export interface DataAuthenticatedUserType {
  id: string
  email: string
  name: string
  imageUrl: string
  role: string
}

export interface Products {
  id: string
  name: string
  InStock: number
  price: number
  imageUrl: string
  productSlug: string
}
