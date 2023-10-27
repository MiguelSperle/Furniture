import { ReactHookFormCreateORLoginUserType } from '../interfaces/GlobalTypes.interface'
import { api } from './GenericService'

const PostService = async (data: ReactHookFormCreateORLoginUserType) => {
  const response = await api.post('/auth/login', data)
  return response.data
}

export const LoginUserService = {
  PostService,
}
