import type { RegisterOptions } from "react-hook-form"
import * as yup from "yup"

type Rules = { [key in 'email' | 'username' | 'password' | 'confirm_password']? : RegisterOptions }
export const rules = (passwordValue: string = ""): Rules =>  ({
    email: {
        required: 'Email is compulsory',
        pattern: {
            value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ ,
            message: 'The email format is invalid' // JS only: <p>error message</p> TS only support string
        }
    },
    username: {
        required: 'Username is required',
        minLength: {
            value: 3,
            message: 'Username must be at least 3 characters long',
        },
        maxLength: {
            value: 20,
            message: 'Username must not exceed 20 characters',
        },
        pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: 'Username must contain only letters and numbers',
        },
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
        },
        maxLength: {
            value: 128,
            message: 'Password must not exceed 128 characters',
        },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*(),.?":{}|<>]).{8,128}$/,
            message: 'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character',
        },
      },
    confirm_password: {
        required: 'Confirm password is required',
        validate: (value: string) =>  value === passwordValue || "The confirmation and password do not match.",  
        minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
        },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*(),.?":{}|<>]).{8,128}$/,
            message: 'Password must include at least one lowercase, one uppercase letter, one number, and one special character',
        },
    }
}
)

// Function to validate confirm password
const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Confirm password is required')
    .min(8, 'Password must be between 8 and 128 characters long')
    .max(128, 'Password must be between 8 and 128 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*(),.?":{}|<>]).{8,128}$/,
      'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character'
    )
    .oneOf([yup.ref(refString)], 'Passwords do not match');
};

// Schema
export const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format')
    .matches(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      'Invalid email format'
    ),
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must not exceed 20 characters')
    .matches(
      /^[a-zA-Z0-9]+$/,
      'Username must only contain letters and numbers'
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be between 8 and 128 characters long')
    .max(128, 'Password must be between 8 and 128 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*(),.?":{}|<>]).{8,128}$/,
      'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character'
    ),
  confirm_password: handleConfirmPasswordYup('password'),
});