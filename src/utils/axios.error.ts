import axios, { AxiosError, HttpStatusCode } from "axios";

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  if (!axios.isAxiosError(error)) {
    console.error('No Axios error:', error) 
  }
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntity (error: unknown) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}