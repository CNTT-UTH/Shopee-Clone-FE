import { Product, ProductParams } from "@uth/types/product.type"
import { ResponseApi } from "@uth/types/utils.type"
import http from "@uth/utils/axios.http"

const URL_PRODUCT = '/products'

const productApi = {
  getAllProduct (params: ProductParams) {
    console.log('params >>>', params)
    return http
      .get<ResponseApi<Product[]>>(`${URL_PRODUCT}/all`, {
        params
      })
      .then((response) => response.data)
      .catch((error) => {
        console.warn('Get all product failed', error)
        throw error
      })
  },
  getProductDetail (id: string) {
    return http
      .get<ResponseApi<Product>>(`${URL_PRODUCT}/${id}`)
      .then(res => res.data)
      .catch(error => {
        console.warn(`Get product detail with id: ${id} fail`)
        throw error
      })
  }
}

export default productApi