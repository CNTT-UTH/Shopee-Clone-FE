import { useQuery } from "@tanstack/react-query"
import productApi from "@uth/apis/product.api"
import { QueryConfig } from "@uth/pages/ProductList/ProductList"

export const useProductAll = (queryConfig?: QueryConfig) => {
  // console.log('query', queryConfig)
  return useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getAllProduct(queryConfig)
    },
    keepPreviousData: true
  })
}
 
export const useCateById = (queryConfig: QueryConfig) => {
  return useQuery({
    queryKey: ['cateId', queryConfig],
    queryFn: () => {
      return productApi.getCateById(queryConfig)
    }
  })
}

export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productApi.getProductDetail(id)
  })
}