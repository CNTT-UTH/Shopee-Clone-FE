import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface IFormInput {
  email: string
  password: string
}

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();

    const onSubmit = handleSubmit(data => {
      console.log(data);
    })

    return (
        <div className="bg-orange">
            <div className="mx-auto max-w-7xl px-4">
                <div className="px-10 grid grid-cols-1 md:grid-cols-5 py-12 lg:py-28 md:pr-10">
                    <div className="lg:col-span-2 lg:col-start-4 md:col-span-3 md:col-start-3">
                        <form
                            onSubmit={onSubmit}
                            action=""
                            className="p-10 rounded bg-white shadow-sm"
                        >
                            <div className="text-2xl">Đăng nhập</div>
                            <div className="mt-6">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="outline-none border-2 rounded-md focus:border-gray-500 border-gray-300 w-full p-3 focus:shadow-md"
                                />
                            </div>
                            <div className="mt-6">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="outline-none border-2 rounded-md focus:border-gray-500 border-gray-300 w-full p-3 focus:shadow-md"
                                />
                            </div>
                            <div className="mt-6">
                                <button type="submit" className="text-white w-full text-center py-4 uppercase bg-orange rounded-md text-sm hover bg-orange-500">
                                    Đăng nhập
                                </button>
                            </div>
                            <div className="mt-10 text-center">
                                <div className="flex items-center justify-center">
                                    <span className="text-gray-400">
                                        Bạn chưa có tài khoản?
                                    </span>
                                    <Link
                                        to="/register"
                                        className="text-blue-400 ml-2"
                                    >
                                        Đăng ký
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
