import { Category } from "@uth/types/category.type"
import { ResponseApi } from "@uth/types/utils.type"
import http from "@uth/utils/axios.http"

const URL_CATEGORIES = '/categories'

const cateApi = {
  getAllCategories () {
    return http
      .get<ResponseApi<Category[]>>(`${URL_CATEGORIES}/get-category-tree`)
      .then(res => res.data)
      .catch(err => console.log('Get all categories fail', err))
  }
}

export default cateApi