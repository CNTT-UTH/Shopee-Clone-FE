import { useMutation, useQuery } from "@tanstack/react-query"
import cartApi from "@uth/apis/cart.api"

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.getMyCart
  })
}
 