// import { Address } from "./address.type"

export interface UserProfileResponse {
  user_profile: User
}

export interface User {
  user_id: string
  username: string
  email: string
  name?: string
  gender?: number  //0: nam, 1: nu, 2: other
  phone?: string
  is_shop: boolean
  status: number; // 0: Chưa xác nhận mail, 1: Đã xác thực, 2: Banned
  avatar?: string
  dob?: string
} 