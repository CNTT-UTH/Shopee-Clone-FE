import { Cart, CartItem, CartRes } from "@uth/types/cart.type"
import { CheckoutTemp } from "@uth/types/order.type"
import { ResponseApi } from "@uth/types/utils.type"
import http from "@uth/utils/axios.http"

const URL_ORDER = '/orders' 

const orderApi = {
  getMyCheckout (session_checkout_id: string) {
    return http
      .get<ResponseApi<CheckoutTemp>>(`${URL_ORDER}/checkout/${session_checkout_id}` )
      .then(res => res.data)
      .catch(err => console.warn('Get my checkout fail', err))
  }, 

  updateMyCheckout () {
    return http
      .post<ResponseApi<{session_checkout_id: string}>>(`${URL_ORDER}/checkout`)
      .then(res => res.data)
      .catch(err => {throw new Error(err)})
  },

  placeAnOrder (session_checkout_id: number) {
    return http
      .post(`${URL_ORDER}/place-order/${session_checkout_id}`)
      .then(res => res.data)
      .catch(err => {throw new Error(err)})
  }, 

  getMyOrders () {
    return http
      .get(`${URL_ORDER}/get-user-orders`)
      .then(res => res.data)
      .catch(err => {throw new Error(err)})
  },

  getOrderDetail (order_id: number) {
    return http
      .get(`${URL_ORDER}/${order_id}`)
      .then(res => res.data)
      .catch(err => {throw new Error(err)})
  }
}

export default orderApi