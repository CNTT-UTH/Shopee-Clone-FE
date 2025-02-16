import { RegisterShopSchemaType, ShopDTO } from "@uth/types/shop.type"
import { ResponseApi } from "@uth/types/utils.type"
import http from "@uth/utils/axios.http"

const URL_SHOP = '/shops'

const shopApi = {
  registerShop (body: RegisterShopSchemaType) {
    return http
      .post<ResponseApi<ShopDTO>>(`${URL_SHOP}/register`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Register seller failed', error)
        throw error
      })
      
  }
}

export default shopApi