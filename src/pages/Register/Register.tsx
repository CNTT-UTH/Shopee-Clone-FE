import { RegisterOptions, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { rules } from "../../utils/rules";

interface FormType {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
} = useForm<FormType>();

  const passwordInput = watch("password")
  const Rules = rules(passwordInput);

  const onSubmit = handleSubmit(data => console.log(data))
  console.log("error", errors);
  return (
    <div className='bg-orange'> 
        <div className="mx-auto max-w-7xl px-4">
          <div className="px-10 grid grid-cols-1 md:grid-cols-5 py-12 lg:py-28 md:pr-10">
            <div className="lg:col-span-2 lg:col-start-4 md:col-span-3 md:col-start-3">
              <form onSubmit={onSubmit} action="" className="p-10 rounded bg-white shadow-sm">
                <div className="text-2xl">Đăng nhập</div>
                <div className="mt-6">
                  <input 
                    {...register("email", Rules.email as RegisterOptions<FormType, "email">)} 
                    placeholder="Email"
                    className="outline-none border-2 rounded-md focus:border-gray-500 border-gray-300 w-full p-3 focus:shadow-md"
                  />
                  <div className="text-red-500 text-sm ml-2 mt-1 min-h-[14px]">{errors.email?.message}</div>
                </div>
                <div className="mt-6">
                  <input 
                    {...register("password", Rules.password as RegisterOptions<FormType, "password">)} 
                    type="password" 
                    placeholder="Password"
                    className="outline-none border-2 rounded-md focus:border-gray-500 border-gray-300 w-full p-3 focus:shadow-md"
                  />
                  <div className="text-red-500 text-sm ml-2 mt-1 min-h-[14px]">{errors.password?.message}</div>
                </div>
                <div className="mt-6">
                  <input 
                    {...register("confirm_password", Rules.confirm_password as RegisterOptions<FormType, "confirm_password">)} 
                    type="confirm_password" 
                    placeholder="Confirm Password"
                    className="outline-none border-2 rounded-md focus:border-gray-500 border-gray-300 w-full p-3 focus:shadow-md"
                  />
                  <div className="text-red-500 text-sm ml-2 mt-1 min-h-[14px]">{errors.confirm_password?.message}</div>
                </div>
                <div className="mt-8">
                  <button type="submit" className="text-white w-full text-center py-4 uppercase bg-orange rounded-md text-sm hover bg-orange-500">
                    Đăng ký
                  </button>
                </div>
                <div className="mt-10 text-center">
                  <div className="flex items-center justify-center">
                    <span className="text-gray-400">Bạn đã có tài khoản?</span>
                    <Link to="/login" className="text-blue-400 ml-2">Đăng nhập</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}
