import { useMutation, useQuery } from "@tanstack/react-query"
import cartApi from "@uth/apis/cart.api"
import { useAuth } from "@uth/contexts/auth.context"

export const useCart = () => {
  const {isAuthenticated} = useAuth()
  return useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.getMyCart,
    enabled: isAuthenticated
  })
}
 