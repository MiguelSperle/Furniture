import { api } from './GenericService'

const GetService = async () => {
  const response = await api.get('/products')
  return response.data
}

export const GetProductsService = {
  GetService,
}
