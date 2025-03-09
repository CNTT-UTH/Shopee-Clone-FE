import { Category } from "@uth/types/category.type"
import { Product, ProductParams } from "@uth/types/product.type"
import { ResponseApi } from "@uth/types/utils.type"
import http from "@uth/utils/axios.http"

const URL_PRODUCT = '/products'

interface ResponseAllProduct {
  data: Product[],
  pagination: ProductParams
}

const productApi = {
  getAllProduct (params?: ProductParams) {
    const bodyParams: ProductParams = params ? params : {page: '1', limit: '12'}
    return http
      .get<ResponseApi<ResponseAllProduct>>(`${URL_PRODUCT}/all`, {
        params: bodyParams
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
  },
  getCateById (params: ProductParams) {
    return http
      .get<ResponseApi<Category>>(`${URL_PRODUCT}/search-by-cate/${params.category}`, {
        params
      })
      .then(res => res.data)
      .catch(err => {
        console.warn(err)
        throw new Error(err) 
      })
  },
  searchProduct (params: ProductParams) {
    return http
      .get<ResponseApi<ResponseAllProduct>>(`${URL_PRODUCT}/search-by-keyword`, {
        params
      })
      .then(res => res.data)
      .catch(err => {
        console.warn(err)
        throw new Error(err) 
      })
  }
}

export default productApi