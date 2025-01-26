import { Schema } from "../utils/validate"

export interface ResponseApi<Data> {
  result: Data
  message: string
  success: boolean
}

export interface ErrorResponse<Errors> {
  message: string
  errors?: Errors
  success: boolean
}

export type AuthError = {
  [key in keyof Omit<Schema, 'confirm_password'>]: {
    message: string;
    value: string;
  };
};