const ACCESS_TOKEN_KEY = 'access_token'

/**
 * Saves the access token to local storage.
 * @param accessToken - The access token to save.
 */
export const saveAccessTokenToLS = (accessToken: string): void => {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  } catch (error) {
    console.error("Failed to save access token to localStorage", error)
  }
}

/**
 * Clears the access token from local storage.
 */
export const clearAccessTokenFromLS = (): void => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  } catch (error) {
    console.error("Failed to remove access token from localStorage", error)
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
