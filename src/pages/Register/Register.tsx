import {  useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from "../../utils/validate"
import Input from "../../components/Input";
import { useTranslation } from 'react-i18next';
import { useMutation } from "@tanstack/react-query";
import { registerAuth } from "../../apis/auth.api";
import { isAxiosUnprocessableEntityError } from "../../utils/axios.error";
import { AuthError, ErrorResponse } from "../../types/utils.type";
import { toast } from "react-toastify"
import { useState } from "react";
import VerifyEmailModal from "../../components/Modal/Modal";
import { motion } from 'framer-motion';
import { containerVariants, inputVariants } from "../../constants/animation.motion";

export default function Register() {
  const [verifyToken, setVerifyToken] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation() //muti languages

  const registerMutation = useMutation({
    mutationFn: (body: Schema) => registerAuth(body)
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
            //  if(authError?.email) {
            //   setError('email', {
            //     message: authError.email.message,
            //     type: 'Server'
            //   })
            //  }
            //  if(authError?.username) {
            //   setError('username', {
            //     message: authError.username.message,
            //     type: 'Server'
            //   })
            //  }
            //  if(authError?.password) {
            //   setError('password', {
            //     message: authError.password.message,
            //     type: 'Server'
            //   })
            //  }
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
                      type={field === 'email' ? 'email' : 'text'}
                      errorMessage={errors[field]?.message}
                      placeholder={t(field.charAt(0).toUpperCase() + field.slice(1))}
                    />
                  </motion.div>
                )
              )}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <button
                  type="submit"
                  className="text-white w-full text-center py-4 uppercase bg-orange rounded-md text-sm hover:bg-orange-500"
                >
                  {t('Register')}
                </button>
              </motion.div>
              <motion.div
                className="mt-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex items-center justify-center">
                  <span className="text-gray-400">{t('Have account')}</span>
                  <Link to="/login" className="text-blue-400 ml-2">
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
  );
}
