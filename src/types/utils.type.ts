export interface ResponseApi<Data> {
  result?: Data
  message: string
}

export interface ErrorResponse<Errors> {
  message: string
  errors: Errors
  success: boolean
}