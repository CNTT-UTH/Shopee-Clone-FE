import { User, UserBodyRequest, UserProfileResponse, UserUploadAvatar } from '../types/user.type'
import { ResponseApi } from '../types/utils.type'
import http from '../utils/axios.http'

const USER_ENDPOINT = '/users';

const userApi = {
  getProfile() {
    return http.get<ResponseApi<UserProfileResponse>>(`${USER_ENDPOINT}/profile`)
    .then(response => response.data)
    .catch(error => {
      console.error("Get profile failed", error)
      throw error
    })
  },

  updateProfile(body: Omit<UserBodyRequest, 'user_id' | 'email' | 'username'>) {
    return http.patch<ResponseApi<UserProfileResponse>>(`${USER_ENDPOINT}/update-profile`, body)
      .then(response => response.data)
      .catch(error => {
        console.error('Update profile fail ', error)
        throw error
      })
  },

  uploadAvatar(body: FormData) {
    return http.post<ResponseApi<UserUploadAvatar>>(`${USER_ENDPOINT}/upload-avatar`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi