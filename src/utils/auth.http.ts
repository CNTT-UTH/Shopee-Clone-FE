import { User } from "../types/user.type"
import CryptoJS from 'crypto-js'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'user_profile'
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY

export const EventTargetLS = new EventTarget()

/**
 * Saves the access token to local storage.
 * @param access_token - The access token to save.
 */
export const setAccessTokenToLS = (access_token: string): void => {
  try {
    const encryptedToken = CryptoJS.AES.encrypt(access_token, SECRET_KEY).toString()
    localStorage.setItem(ACCESS_TOKEN_KEY, encryptedToken)
  } catch (error) {
    console.error("Failed to save access token to localStorage", error)
  }
}

/**
 * Saves the access token to local storage.
 * @param refresh_token - The refresh token to save.
 */
export const setRefreshTokenToLS = (refresh_token: string): void => {
  try {
    const encryptedToken = CryptoJS.AES.encrypt(refresh_token, SECRET_KEY).toString()
    localStorage.setItem(REFRESH_TOKEN_KEY, encryptedToken)
  } catch (error) {
    console.error("Failed to save refresh token to localStorage", error)
  }
}

/**
 * Clears the access token from local storage.
 */
export const clearLS = (): void => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    
    const clearEvent = new Event('clear')
    EventTargetLS.dispatchEvent(clearEvent)

  } catch (error) {
    console.error("Failed to remove these properties from localStorage", error)
  }
}

/**
 * Retrieves the access token from local storage.
 * @returns The access token, or an empty string if not found.
 */
export const getAccessTokenFromLS = (): string => {
  try {
    const encryptedToken = localStorage.getItem("access_token")
    if (!encryptedToken) return ''

    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)

  } catch (error) {
    console.error("Failed to retrieve access token from localStorage", error)
    return ''
  }
}

export const getRefreshTokenFromLS = (): string => {
  try {
    const encryptedToken = localStorage.getItem("refresh_token")
    if (!encryptedToken) return ''

    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)  } catch (error) {
    console.error("Failed to retrieve refresh token from localStorage", error)
    return ''
  }
}

export const setUserProfileToLS = (user: User): void => {
  try {
    console.log(user)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch (error) {
    console.error(`Failed to save user profile to localStorage [Key: ${USER_KEY}]`, error)
  }
}

export const getUserProfileFromLS = (): User | null => {

  try {
    const result = localStorage.getItem(USER_KEY)
    if (!result) return null

    return JSON.parse(result)
  } catch (error) {
    console.error(`Failed to parse user profile from localStorage [Key: ${USER_KEY}]`, error)
    return null
  }
}

