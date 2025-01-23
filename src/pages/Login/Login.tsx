import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from "../../utils/validate";
import Input from "../../components/Input";
import { useTranslation } from 'react-i18next';
import { useMutation } from "@tanstack/react-query";
import { loginAuth } from "../../apis/auth.api";
import { AuthError, ErrorResponse } from "../../types/utils.type";
import { isAxiosUnprocessableEntityError } from "../../utils/axios.error";
import { toast } from "react-toastify";

type FormData = Pick<Schema, 'email' | 'username' | 'password'>
const loginValidate = schema.pick(['email', 'username', 'password'])


export default function Login() {
    //muti language
    const  { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
      resolver: yupResolver(loginValidate)
    })
    
    const loginMutation = useMutation({
        mutationFn: (body: FormData) => loginAuth(body)
    })

    const onSubmit = handleSubmit((data) => {
      loginMutation.mutate(data, {
        onSuccess: (data) => {
          console.log("check onsuccess_", data)
        },

        onError: (error) => {
          if (isAxiosUnprocessableEntityError<ErrorResponse<AuthError>>(error)) {
             const authError = error.response?.data.errors
             if (authError) {
              toast.error(authError.email.message, {
                theme: 'dark',
                pauseOnHover: true
              })
            } 
          }
        }
      }) 
    })

    return (
        <div className="bg-orange">
            <div className="mx-auto max-w-7xl px-4">
                <div className="px-10 grid grid-cols-1 md:grid-cols-5 py-12 lg:py-28 md:pr-10">
                    <div className="lg:col-span-2 lg:col-start-4 md:col-span-3 md:col-start-3">
                        <form
                            onSubmit={onSubmit}
                            noValidate
                            className="p-10 rounded bg-white shadow-sm"
                        >
                            <div className="text-2xl">{t("Login")}</div>
                            <Input
                                name="username"
                                register={register}
                                type="username"
                                errorMessage={errors.username?.message}
                                placeholder="Username"
                            />
                            <Input
                                name="email"
                                register={register}
                                type="email"
                                errorMessage={errors.email?.message}
                                placeholder="Email"
                            />
                            <Input 
                                name='password'
                                register={register}
                                type='password'
                                errorMessage={errors.password?.message}
                                placeholder="Password"
                                /> 
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="text-white w-full text-center py-4 uppercase bg-orange rounded-md text-sm hover bg-orange-500"
                                >
                                    {t("Login")}
                                </button>
                            </div>
                            <div className="mt-10 text-center">
                                <div className="flex items-center justify-center">
                                    <span className="text-gray-400">
                                        {t("Don't have account")}
                                    </span>
                                    <Link
                                        to="/register"
                                        className="text-blue-400 ml-2"
                                    >
                                        {t("Register")}
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
