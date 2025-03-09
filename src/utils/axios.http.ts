import { AuthResponse, RefreshTokenResponse } from '../types/auth.type'
import axios, {AxiosError, AxiosResponse, HttpStatusCode, type AxiosInstance} from 'axios'
import { toast } from 'react-toastify'
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setRefreshTokenToLS, setUserProfileToLS } from './auth.http'
import { useNavigate } from 'react-router-dom' 
import { isAxiosExpiredError, isAxiosUnauthorizedError } from './axios.error'
import { ErrorResponse } from '../types/utils.type'

class Http {
  instance : AxiosInstance
  private access_token: string
  private refresh_token: string
  private callRefreshToken: Promise<string> | null

  constructor() {
    //init for properties
    this.access_token = getAccessTokenFromLS()
    this.refresh_token = getRefreshTokenFromLS()
    this.callRefreshToken = null

    this.instance = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_token && config.headers) {
          config.headers.Authorization = `Bearer ${this.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  private initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response) => {
        this.handleAuthResponses(response);
        return response;
      },
      (error: AxiosError) => {
        this.handleErrorResponse(error);
        return Promise.reject(error);
      },
    );
  }

  private handleAuthResponses(response: AxiosResponse<AuthResponse>) {
    const { url } = response.config
    const result = (response.data as AuthResponse).result
    if (url === '/auth/login' || url === '/auth/verify-email') {
      console.log(response)
      this.access_token = result.access_token 
      this.refresh_token = result.refresh_token
      
      setAccessTokenToLS(this.access_token)
      setRefreshTokenToLS(this.refresh_token)
      setUserProfileToLS(result.user_profile)
    } else if (url === '/auth/logout') {
      this.access_token = ''
      this.refresh_token = ''
      clearLS();
    }
  }

  private handleErrorResponse(error: AxiosError) {
    if (error.response?.status !== HttpStatusCode.UnprocessableEntity && error.response?.status !== HttpStatusCode.Unauthorized) {
      const message = (error.response?.data as { message: string })?.message || error.message;
      toast.error(message, { theme: 'colored' });
    }

    //Handle specific status codes like 401 
    // - token is wrong
    // - don't pass token
    // - token is expired
    if (isAxiosUnauthorizedError<ErrorResponse<null>>(error)) {
      const config = error.response?.config || {headers: {}, url: ''}
      console.log('config', config)

      if (isAxiosExpiredError(error) && config.url !== '/auth/refresh-token') {

        // limit more calls to handleRefreshToken
        this.callRefreshToken = this.callRefreshToken
          ? this.callRefreshToken
          : this.handleRefreshToken().finally(() => {
              // Keep callRefreshToken for 10 seconds for subsequent requests, if there is a 401 then use it
              setTimeout(() => {
                this.callRefreshToken = null
              }, 10000)
            })
        return this.callRefreshToken.then((access_token) => {
          // This means we continue to call back the old request that just failed
          return this.instance({ ...config, headers: { ...config.headers, Authorization: `Bearer ${access_token}` } })
        })
      }


      //remaining cases
      clearLS()
      this.access_token = ''
      this.refresh_token = ''
      toast.error((error.response?.data.errors && (error.response.data.errors as ErrorResponse<{message: string}>).message) 
      || error.response?.data.message)}
  }

  private handleRefreshToken() {
    return this.instance.post<RefreshTokenResponse>('/auth/refresh-token', {refresh_token: this.refresh_token})
      .then(res => {
        const access_token = res.data.result.access_token
        const refresh_token = res.data.result.refresh_token
        setAccessTokenToLS(access_token)
        setRefreshTokenToLS(refresh_token)
        this.access_token = access_token
        this.refresh_token = refresh_token
        return access_token
      })
      .catch(error => {
        clearLS()
        this.access_token = ''
        this.refresh_token = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http