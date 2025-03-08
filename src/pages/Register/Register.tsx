import {  useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from "../../utils/validate"
import Input from "../../components/Input"
import { useTranslation } from 'react-i18next'
import { useMutation } from "@tanstack/react-query"
import authApi from "../../apis/auth.api"
import { isAxiosUnprocessableEntityError } from "../../utils/axios.error"
import { AuthError, ErrorResponse } from "../../types/utils.type"
import { toast } from "react-toastify"
import { useState } from "react"
import VerifyEmailModal from "../../components/Modal/Modal"
import { motion } from 'framer-motion'
import { containerVariants, inputVariants } from "../../constants/animation.motion"
import Button from "../../components/Button"
import path from "../../constants/path"
import RobotCaptcha from "@uth/components/CaptchaRobot"
import useInputRefs from "@uth/constants/inputRefs"

export default function Register() {
  const [verifyToken, setVerifyToken] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNotRobot, setIsNotRobot] = useState(false)
  const fields: string[] = ['email', 'username', 'password', 'confirm_password']
  const { emailRef, usernameRef, passwordRef, confirmPasswordRef } = useInputRefs();
  const { t } = useTranslation() //muti languages
  const buttonClass = "text-white w-full disabled:opacity-70 text-center py-4 uppercase bg-orange rounded-md text-sm hover:bg-orange-500"

  const registerMutation = useMutation({
    mutationFn: (body: Schema) => authApi.registerAuth(body)
  }) 

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
} = useForm<Schema>({
  resolver: yupResolver(schema)
})


  const onSubmit = handleSubmit(data => {
    if(!isNotRobot) return
    registerMutation.mutate(data, {
      onSuccess: (data) => {
          toast.success("You have registered successfully!", {
            theme: 'light'
          })
          setVerifyToken(data.result?.verify_mail_token)
          setIsModalOpen(true)
        },

      onError: (error) => {
          if (isAxiosUnprocessableEntityError<ErrorResponse<AuthError>>(error)) {
             const authError = error.response?.data.errors
             if (authError) {
              Object.keys(authError).forEach((key) => {
                setError(key as keyof Schema, {
                  message: authError[key as keyof Omit<Schema, 'confirm_password'>].message,
                  type: 'Server'
                })
              })
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
                {t('Register')}
              </motion.div>
              {(['email', 'username', 'password', 'confirm_password'] as Array<keyof Schema>).map(
                (field, index) => (
                  <motion.div key={field} custom={index} variants={inputVariants}>
                    <Input
                      name={field}
                      register={register}
                      type={field === 'confirm_password' ? 'password' : field}
                      errorMessage={errors[field]?.message}
                      placeholder={t(field.charAt(0).toUpperCase() + field.slice(1))}
                      onKeyDown={(e) => {
                        if (field === 'confirm_password' && !isNotRobot && e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                    />
                  </motion.div>
                )
              )}

              <RobotCaptcha onVerify={() => setIsNotRobot(true)}/>


              <motion.div
                className='mt-8'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <Button
                  isLoading={registerMutation.isLoading}
                  disabled={registerMutation.isLoading}
                  type="submit"
                  className={!isNotRobot ? buttonClass + "pointer-events-none cursor-not-allowed opacity-70" : buttonClass}
                >
                  {t('Register')}
                </Button>
              </motion.div>
              <motion.div
                className="mt-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex items-center justify-center">
                  <span className="text-gray-400">{t('Have account')}</span>
                  <Link to={path.login} className="text-blue-400 ml-2">
                    {t('Login')}
                  </Link>
                </div>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
      {verifyToken && (
        <VerifyEmailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          token={verifyToken}
        />
      )}
    </div>
  )
}
