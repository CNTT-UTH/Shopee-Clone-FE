import { useQuery } from "@tanstack/react-query"
import productApi from "@uth/apis/product.api"
import { QueryConfig } from "@uth/pages/ProductList/ProductList"

export const useProductAll = (queryConfig: QueryConfig) => {
  console.log('query', queryConfig)
  return useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getAllProduct(queryConfig)
    },
    keepPreviousData: true
  })
}
 