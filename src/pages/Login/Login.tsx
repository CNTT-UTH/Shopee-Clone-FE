import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup'
import { loginValidate, schema, Schema } from "../../utils/validate"
import Input from "../../components/Input"
import { useTranslation } from 'react-i18next'
import { useMutation } from "@tanstack/react-query"
import authApi from "../../apis/auth.api"
import { AuthError, ErrorResponse } from "../../types/utils.type"
import { isAxiosUnprocessableEntityError } from "../../utils/axios.error"
import { toast } from "react-toastify"
import { useAuth } from "../../contexts/auth.context"
import { motion } from 'framer-motion'
import { containerVariants, inputVariants } from "../../constants/animation.motion"
import Button from "../../components/Button"
import path from "../../constants/path"
import RobotCaptcha from "@uth/components/CaptchaRobot"
import { useState } from "react"

type FormData = {
  firstField: string
  password: string
}
 
type FinalFormData = {
  email?: string 
  username?: string 
  password: string 
} 


export default function Login() {
    const  { t } = useTranslation()
    const { setIsAuthenticated, setUser } = useAuth()
    const navigate = useNavigate()
    const [isNotRobot, setIsNotRobot] = useState(false)
    const buttonClass = "text-white w-full disabled:opacity-70 text-center py-4 uppercase bg-orange rounded-md text-sm hover:bg-orange-500"

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
      resolver: yupResolver(loginValidate)
    })
    
    const loginMutation = useMutation({
        mutationFn: (body: FinalFormData) => {
          return authApi.loginAuth(body)
        }
    })

    const onSubmit = handleSubmit((data) => {
      const isEmail = /\S+@\S+\.\S+/.test(data.firstField as string); // check whether email or username 
      const body = isEmail
        ? { email: data.firstField, password: data.password }
        : { username: data.firstField, password: data.password };

      loginMutation.mutate(body, {
        onSuccess: (data) => {
          toast.success("You have logged in successfully!", {
            theme: 'colored',
          })
          setIsAuthenticated(true)
          setUser(data.result.user_profile)
          navigate('/')
        },

        onError: (error) => {
          if (isAxiosUnprocessableEntityError<ErrorResponse<AuthError>>(error)) {
             const authError = error?.response?.data.errors
              console.log('>>>onerror', authError)

             if (authError) {
              if(authError.email) toast.error(authError.email.message)
              else toast.error(authError.username.message)
              
              // toast.error(authError.email.message, {
              //   theme: 'dark',
              //   pauseOnHover: true
              // })
              // toast.error(authError.username.message, {
              //   theme: 'dark',
              //   pauseOnHover: true
              // })
            } 
          }
        }
      }) 
    }) 

    return (
        <div className="bg-orange">
            <div className="mx-auto max-w-7xl px-4">
            <motion.div
              className="px-10 grid grid-cols-1 md:grid-cols-5 py-12 lg:py-28 md:pr-10"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
            <motion.div
              className="lg:col-span-2 lg:col-start-4 md:col-span-3 md:col-start-3"
              variants={containerVariants}
            >
            <form
              noValidate
              onSubmit={onSubmit}
              action=""
              className="p-10 rounded bg-white shadow-sm"
            >
              <motion.div
                className="text-2xl mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t('Login')}
              </motion.div>

              {(['firstField', 'password'] as Array<keyof FormData>).map((field, index) => (
                    <motion.div key={field} custom={index} variants={inputVariants}>
                    <Input
                      name={field}
                      register={register}
                      type={field === 'password' ? 'password' : 'text'}
                      errorMessage={errors[field]?.message}
                      placeholder={t(field === 'firstField' ? 'Username or Email' : 'Password')}
                      onKeyDown={(e) => {
                        if (field === 'password' && !isNotRobot && e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                    />
                  </motion.div>
              ))}

              <RobotCaptcha onVerify={() => setIsNotRobot(true)}/>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <Button
                  type="submit"
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                  className={!isNotRobot ? buttonClass + "pointer-events-none cursor-not-allowed opacity-70" : buttonClass}
                >
                  {t('Login')}
                </Button>
              </motion.div>
              <motion.div
                className="mt-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex items-center justify-center">
                  <span className="text-gray-400">{t("Don't have account")}</span>
                  <Link to={path.register} className="text-blue-400 ml-2">
                    {t('Register')}
                  </Link>
                </div>
              </motion.div>
            </form>
            
          </motion.div>
        </motion.div>
      </div>
  </div>
  );
}
