import { User } from "../types/user.type"

const ACCESS_TOKEN_KEY = 'access_token'
const USER_KEY = 'user_profile'

/**
 * Saves the access token to local storage.
 * @param accessToken - The access token to save.
 */
export const setAccessTokenToLS = (accessToken: string): void => {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  } catch (error) {
    console.error("Failed to save access token to localStorage", error)
  }
}

/**
 * Clears the access token from local storage.
 */
export const clearLS = (): void => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
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
    return localStorage.getItem(ACCESS_TOKEN_KEY) || ''
  } catch (error) {
    console.error("Failed to retrieve access token from localStorage", error)
    return ''
  }
}

export const setUserProfileFromLS = (user: User): void => {
  try {
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

