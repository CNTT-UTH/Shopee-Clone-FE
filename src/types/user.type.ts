// import { Address } from "./address.type"

export interface UserProfileResponse {
  user_profile: User
}

interface UserGeneral {
  user_id: string
  username: string
  email: string
  name?: string
  gender?: number  //0: nam, 1: nu, 2: other
  phone?: string
  is_shop?: boolean
  status?: number; // 0: Chưa xác nhận mail, 1: Đã xác thực, 2: Banned
  avatar?: string
}

export interface User extends UserGeneral {
  dob?: number  //timestamp
} 

export interface UserBodyRequest extends UserGeneral {
  dob?: string   //send request with dob ISOString 8601
}

export type UserUploadAvatar = [{
  url: string
  type: string
}]