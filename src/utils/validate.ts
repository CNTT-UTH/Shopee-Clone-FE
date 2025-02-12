import * as yup from "yup"
 

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
    .min(6, 'Username must be at least 6 characters long')
    .max(24, 'Username must not exceed 24 characters')
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

export const otpValidate = yup.object().shape({
  otp: yup.string().required('OTP is required').length(6, 'OTP must be 6 digits')
})

export const loginValidate = yup.object({
  firstField: yup
    .string()
    .required('Email or Username is required') 
    .test('is-email-or-username', 'Invalid email or username', (value) => 
      /\S+@\S+\.\S+/.test(value)  
        ? (schema.fields.email as yup.StringSchema<string>).isValidSync(value) 
        : (schema.fields.username as yup.StringSchema<string>).isValidSync(value)  
    ),
  password: schema.fields.password as yup.StringSchema<string>  
});



export type Schema = yup.InferType<typeof schema>
export type OtpSchema = yup.InferType<typeof otpValidate>;
