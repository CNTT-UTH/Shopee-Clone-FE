// import { schema } from "@uth/utils/validate";
import * as yup from "yup"

export const userSchema = yup.object({
  name: yup.string().max(160, 'The maximum length is 160 characters'),
  phone: yup.string().optional(),
  avatar: yup.string().max(1000, 'The maximum length is 1000 characters'),
  dob: yup.date().max(new Date(), 'Please choose the valid time'),
  gender: yup.number().oneOf([0, 1, 2], "Gender must be 0 (male), 1 (female), or 2 (other)")
})

export type UserSchemaType = yup.InferType<typeof userSchema>