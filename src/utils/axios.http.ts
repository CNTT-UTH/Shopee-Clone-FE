import axios, {AxiosError, HttpStatusCode, type AxiosInstance} from 'axios'
import { toast } from 'react-toastify'

class Http {
  instance : AxiosInstance
  private accessToken: string
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    //config res interceptors
    this.instance.interceptors.response.use(
      (response) => { 
          const {url} = response.config
          if( url === '/auth/login' || url === '/auth/register') {
            this.accessToken = response.data.result.accessToken
          }
          console.log('>>', this.accessToken)
          return response
      }, 
      function (error: AxiosError) { 
        if(error.response?.status !== HttpStatusCode.UnprocessableEntity)  {
          const message = (error.response?.data as { message: string }).message || error.message
          toast.error(message, {
            theme: 'colored'
          })
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http