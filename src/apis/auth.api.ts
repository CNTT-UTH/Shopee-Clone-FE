import { AuthResponse } from "../types/auth.type"
import http from "../utils/http"

interface RegisterBody {
  email: string
  username: string
  password: string
  confirm_password: string
}

export const registerAuth = (body: RegisterBody) => {
  return http.post<AuthResponse>('/auth/register', body)
}