import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { OtpSchema } from '../../utils/validate';
import { verifyEmail } from '../../apis/auth.api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@uth/context/auth.context';

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

  const { setIsAuthenticated } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyForm>();

    const verifyMutation = useMutation({
      mutationFn: (body: OtpSchema) => verifyEmail({ verify_email_token: token, code: body.otp })
    }) 

  const onSubmit = handleSubmit(data => {
    verifyMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Email verified successfully!", { theme: 'colored' })
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: () => {
        toast.error("Invalid OTP. Please try again.", { theme: 'colored' })
      }
    })
  })

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-30" />
      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded shadow-md p-6">
          <Dialog.Title className="text-xl font-bold mb-4">Verify Email</Dialog.Title>
          <form onSubmit={onSubmit} className="space-y-4">
            {/* OTP Input */}
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                id="otp"
                type="text"
                {...register('otp', { required: 'OTP is required' })}
                className={`w-full px-3 py-2 border rounded ${
                  errors.otp ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring focus:ring-blue-500`}
                placeholder="Enter OTP"
              />
              {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Verify
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}