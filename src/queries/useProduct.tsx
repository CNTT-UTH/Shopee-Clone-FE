import { useQuery } from "@tanstack/react-query"
import productApi from "@uth/apis/product.api"
import { ProductParams } from "@uth/types/product.type"

export const useProductAll = (queryParam: ProductParams) => {
  if(!queryParam.page || !queryParam.limit) queryParam = {page: queryParam.page || 1, limit: queryParam.limit || 30}
  console.log('query', queryParam)
  return useQuery({
    queryKey: ['products', queryParam],
    queryFn: () => {
      return productApi.getAllProduct(queryParam)
    }
  })
}