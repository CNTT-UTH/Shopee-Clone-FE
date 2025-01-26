import { User } from 'src/types/user.type'
import { ResponseApi } from 'src/types/utils.type'
import http from 'src/utils/axios.http'

const USER_ENDPOINT = '/users';

const userApi = {
  getProfile() {
    return http.get<ResponseApi<User>>(`${USER_ENDPOINT}/profile`)
    .then(response => response.data)
    .catch(error => {
      console.error("Get profile failed", error)
      throw error
    })
  } 
}

export default userApi