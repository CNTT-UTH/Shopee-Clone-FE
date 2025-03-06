import { Cart, CartItem, CartRes } from "@uth/types/cart.type"
import { ResponseApi } from "@uth/types/utils.type"
import http from "@uth/utils/axios.http"

const URL_CART = '/carts'

interface deleteBodyType {
  item_id: number
}

const cartApi = {
  getMyCart () {
    return http
      .get<ResponseApi<CartRes>>(`${URL_CART}/get-my-cart`)
      .then(res => res.data)
      .catch(err => console.log('Get my cart fail', err))
  }, 

  addToCart (body: CartItem) {
    return http
      .post<ResponseApi<CartRes>>(`${URL_CART}/add-or-update-item`, body)
      .then(res => res.data)
      .catch(err => console.warn('Update cart fail', err))
  },

  removeItemFromCart (item_id: number) {
    return http
      .delete(`${URL_CART}/remove-item`, {
        data: {item_id}
      })
  }
}

export default cartApi