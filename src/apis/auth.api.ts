import { getRefreshTokenFromLS } from '../utils/auth.http'
import { AuthResponse, RegisterResponse } from '../types/auth.type'
import http from '../utils/axios.http'

const URL_AUTH = '/auth'

const URL_REGISTER = `${URL_AUTH}/register`
const URL_LOGIN = `${URL_AUTH}/login`
const URL_VERIFY_EMAIL = `${URL_AUTH}/verify-email`
const URL_LOGOUT = `${URL_AUTH}/logout`

const authApi = {
  /**
   * Registers a new user.
   * @param body - The registration details.
   * @returns A promise resolving to the registration response data.
   */
  registerAuth(body: { email: string, username: string, password: string, confirm_password: string }) {
    return http
      .post<RegisterResponse>(URL_REGISTER, body)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Registration failed', error)
        throw error
      })
  },

  /**
   * Logs in an existing user.
   * @param body - The login details.
   * @returns A promise resolving to the authentication response data.
   */
  loginAuth(body: { username?: string, email?: string, password: string }) {
    return http
      .post<AuthResponse>(URL_LOGIN, body)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Login failed', error)
        throw error
      })
  },

  /**
   * Verifies a user's email.
   * @param body - The verification details.
   * @returns A promise resolving to the authentication response data.
   */
  verifyEmail(body: { verify_email_token: string, code: string }) {
    return http
      .post<AuthResponse>(URL_VERIFY_EMAIL, body)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Verify email failed', error)
        throw error
      })
  },

  /**
   * Logs out the current user.
   * @param body - Additional logout details if any.
   * @returns A promise resolving to the logout response data.
   */
  logoutAuth() {
    return http
      .post(URL_LOGOUT, {refresh_token: getRefreshTokenFromLS()})
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error)
        console.log('logout method is fail : ', error)
      })
  },
}

export default authApi
