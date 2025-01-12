import axios, {type AxiosInstance} from 'axios'

class Http {
  instance : AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    //config res interceptors
    this.instance.interceptors.response.use(
      function (response) { 
          return response
      }, 
      function (error) { 
        console.log(error)  
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http