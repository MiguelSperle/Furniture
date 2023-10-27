import { ReactHookFormCreateORLoginUserType } from '../interfaces/GlobalTypes.interface'
import { api } from './GenericService'

const PostService = async (data: ReactHookFormCreateORLoginUserType) => {
  const response = await api.post('/auth/register', data)
  return response.data
}

export const CreateUserService = {
  PostService,
}
