// import { schema } from "@uth/utils/validate";
import * as yup from "yup"

export const userSchema = yup.object({
  name: yup.string().max(160, 'The maximum length is 160 characters'),
  phone: yup.string().max(20, 'The maximum length is 20 characters'),
  address: yup.string().max(160, 'The maximum length is 160 characters'),
  avatar: yup.string().max(1000, 'The maximum length is 1000 characters')
})

export type UserSchemaType = yup.InferType<typeof userSchema>