import { useQuery } from "@tanstack/react-query"
import productApi from "@uth/apis/product.api"
import { ProductParams } from "@uth/types/product.type"

const useSearch = (queryConfig: ProductParams) => {
  return useQuery({
    queryKey: ['search', queryConfig],
    queryFn: () => productApi.searchProduct(queryConfig)
  })
}


export default useSearch