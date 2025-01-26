import { ErrorResponse } from "../types/utils.type";
import axios, { AxiosError, HttpStatusCode } from "axios";

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  if (!axios.isAxiosError(error)) {
    console.error('No Axios error:', error) 
  }
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError> (error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<null>>(error) &&
    error.response?.data?.message === 'Token expired'
  )
}