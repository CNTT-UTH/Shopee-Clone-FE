import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { rules } from "../../utils/rules";
import Input from "../../Components/Input";

interface IFormInput {
    email: string;
    password: string;
}

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

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
                            <div className="text-2xl">Đăng nhập</div>
                            <Input
                                name="email"
                                register={register}
                                type="email"
                                errorMessage={errors.email?.message}
                                placeholder="Email"
                                Rules={rules().email}
                            />
                            <Input 
                                name='password'
                                register={register}
                                type='password'
                                errorMessage={errors.password?.message}
                                placeholder="Password"
                                Rules={rules().password}
                                /> 
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="text-white w-full text-center py-4 uppercase bg-orange rounded-md text-sm hover bg-orange-500"
                                >
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
