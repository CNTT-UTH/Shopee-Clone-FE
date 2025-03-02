import { useQuery } from "@tanstack/react-query"
import cateApi from "@uth/apis/categories.api" 

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return cateApi.getAllCategories()
    } 
  })
}