import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../../apis/auth.api";
import { otpValidate, OtpSchema } from "../../utils/validate";
import { motion } from "framer-motion";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const verifyEmailToken = location.state?.verifyMailToken;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpSchema>({
    resolver: yupResolver(otpValidate)
  });

  const verifyMutation = useMutation({
    mutationFn: (otp: OtpSchema) => verifyEmail({ verifyToken: verifyEmailToken, otp })
  }) 

  const onSubmit = handleSubmit(data => {
    verifyMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Email verified successfully!", { theme: 'colored' });
        navigate('/');
      },
      onError: () => {
        toast.error("Invalid OTP. Please try again.", { theme: 'colored' });
      }
    })
  })

  return (
<div className="bg-orange min-h-screen flex items-center justify-center">
      <motion.div
        className="mx-auto max-w-7xl px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="grid grid-cols-1 xl:grid-cols-7 md:grid-cols-5 py-12 lg:py-20 xl:pr-0"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="lg:col-span-4 lg:col-start-4 xl:col-start-6 md:col-span-3 md:col-start-3">
            <form
              onSubmit={onSubmit}
              className="bg-white p-14 rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <h2 className="text-2xl font-bold mb-10 text-center text-gray-700 xl:text-red-900">
                Verify Email
              </h2>
              <div className="mb-12">
                <input
                  type="text"
                  {...register("otp")}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition-shadow"
                  placeholder="Enter OTP"
                />
                {errors.otp && (
                  <p className="text-red-500 mt-1 text-sm">{errors.otp.message}</p>
                )}
              </div>
              <motion.button
                type="submit"
                className="text-white w-full text-center py-4 uppercase bg-orange rounded-md text-sm hover bg-orange-500"
                whileHover={{ scale: 1.1 }}
              >
                Verify
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
