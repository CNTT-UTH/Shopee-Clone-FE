import { AuthResponse } from "@uth/types/auth.type"
import http from "@uth/utils/http"

interface RegisterBody {
  email: string
  username: string
  password: string
  confirm_password: string
}

export const registerAuth = (body: RegisterBody) => {
  return http.post<AuthResponse>('/auth/register', body)
}