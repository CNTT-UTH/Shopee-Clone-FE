import { Address } from "./address.type"

export interface User {
  user_id: string
  username: string
  email: string
  name?: string
  dob?: string
  gender?: string
  phone?: string
  is_shop?: string
  status?: number; // 0: Chưa xác nhận mail, 1: Đã xác thực, 2: Banned
  default_address?: Address
}