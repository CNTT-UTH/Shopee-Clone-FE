import { AuthResponse } from '../types/auth.type'
import axios, {AxiosError, AxiosResponse, HttpStatusCode, type AxiosInstance} from 'axios'
import { toast } from 'react-toastify'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setUserProfileFromLS } from './auth.http'
import { useNavigate } from 'react-router-dom' 

class Http {
  instance : AxiosInstance
  private access_token: string
  constructor() {
    this.access_token = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
      timeout: 10000,
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
      setAccessTokenToLS(this.access_token)
      setUserProfileFromLS(result.user_profile)
    } else if (url === '/auth/logout') {
      this.access_token = ''
      clearLS();
    }
  }

  private handleErrorResponse(error: AxiosError) {
    if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
      const message = (error.response?.data as { message: string })?.message || error.message;
      toast.error(message, { theme: 'colored' });
    }

    //Handle specific status codes like 401 or 403.
    if (error.response?.status === HttpStatusCode.Unauthorized || error.response?.status === HttpStatusCode.Forbidden) {
      this.handleUnauthorizedError();
    }
  }

  private handleUnauthorizedError() {
    // Logic to redirect to login page or refresh token
    clearLS();
    this.access_token = '';
    toast.error('Your token has expired. Please log in again.', { theme: 'colored' });
    const navigate = useNavigate()
    navigate('/login')
  }

}

const http = new Http().instance

export default http