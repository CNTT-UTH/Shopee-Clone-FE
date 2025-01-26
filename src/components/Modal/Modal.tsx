import { useForm } from 'react-hook-form';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { OtpSchema } from '../../utils/validate';
import authApi from '../../apis/auth.api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';
import { Fragment } from 'react';
import { motion } from "framer-motion";

interface VerifyEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
}

type VerifyForm = {
  otp: string;
};

export default function VerifyEmailModal({
  isOpen,
  onClose,
  token,
}: VerifyEmailModalProps) {

  const { setIsAuthenticated, setUser } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyForm>();

    const verifyMutation = useMutation({
      mutationFn: (body: OtpSchema) => authApi.verifyEmail({ verify_email_token: token, code: body.otp })
    }) 

  const onSubmit = handleSubmit(data => {
    verifyMutation.mutate(data, {
      onSuccess: (data) => {
        toast.success("Email verified successfully!", { theme: 'colored' })
        setIsAuthenticated(true)
        setUser(data.result.user_profile)
        navigate('/')
      },
      onError: () => {
        toast.error("Invalid OTP. Please try again.", { theme: 'colored' })
      }
    })
  })

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-md transform bg-white rounded-lg shadow-lg p-6 transition-all">
              <DialogTitle className="text-xl font-bold mb-4">Verify Email</DialogTitle>
              <form onSubmit={onSubmit} className="space-y-4">
                {/* OTP Input */}
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

                {/* Buttons */}
                <div className="flex justify-end space-x-2">
                  <motion.button
                    type="button"
                    onClick={onClose}
                    className="text-white px-4 text-center py-4 uppercase bg-gray-300 hover:bg-gray-500 rounded-md text-sm hover bg-orange-500"
                    whileHover={{ scale: 1.1 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="text-white px-4 text-center py-4 uppercase bg-orange rounded-md text-sm hover hover:bg-opacity-80"
                    whileHover={{ scale: 1.1 }}
                  >
                    Verify
                  </motion.button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}