import { AuthResponse } from '../types/auth.type'
import axios, {AxiosError, AxiosResponse, HttpStatusCode, type AxiosInstance} from 'axios'
import { toast } from 'react-toastify'
import { clearAccessTokenFromLS, getAccessTokenFromLS, saveAccessTokenToLS } from './auth.http'
import { useNavigate } from 'react-router-dom'

class Http {
  instance : AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
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
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
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
    const { url } = response.config;
    if (url === '/auth/login' || url === '/auth/register') {
      this.accessToken = (response.data as AuthResponse).result?.accessToken || '';
      saveAccessTokenToLS(this.accessToken);
    } else if (url === '/auth/logout') {
      this.accessToken = '';
      clearAccessTokenFromLS();
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
    clearAccessTokenFromLS();
    this.accessToken = '';
    toast.error('Your session has expired. Please log in again.', { theme: 'colored' });
    const navigate = useNavigate()
    navigate('/login')
  }

}

const http = new Http().instance

export default http