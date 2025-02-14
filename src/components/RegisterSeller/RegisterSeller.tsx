import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const RegisterSellerSchema = yup.object().shape({
  nameShop: yup.string().required('Tên shop là bắt buộc'),
  phoneShop: yup.string().required('Số điện thoại là bắt buộc'),
  city: yup.string().optional(),
  district: yup.string().optional(),
  ward: yup.string().optional(),
  address_line: yup.string().optional(),
});

const steps = [
  'Seller Information',
  'Shop Information' 
]

export default function RegisterSeller() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(RegisterSellerSchema)
  })
  const [step, setStep] = useState(1)

  const onSubmit = handleSubmit((data) => {
    console.log(data, errors)
    if(errors.nameShop?.message || errors.phoneShop?.message) {
      console.log('check')
      setStep(1)
      return
    }
  }) 
  console.log('>>>')

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-center mb-10">REGISTER FOR SELLING</h2>
        <div className="flex justify-between items-center">
          {steps.map((label, index) => (
            <div key={index} className={`flex-1 mb-4 text-center text-lg ${step === index + 1 ? 'text-orange font-bold' : 'text-gray-500'}`}>
              {label}
            </div>
          ))}
        </div>
      </div>
      
      <form onSubmit={onSubmit} className='px-4'>
        {step === 1 && (
          <>
            <Input
              name="nameShop"
              placeholder="Shop name"
              register={register}
              rules={{ required: 'Shop name is required' }}
              errorMessage={errors.nameShop?.message}
            />
            <Input
              name="phoneShop"
              placeholder="Shop phone"
              register={register}
              rules={{ required: 'Shop phone is required' }}
              errorMessage={errors.phoneShop?.message}
            />
            <button
              type="button"
              className="mt-4 bg-gradient-to-b from-[#d0011b] to-[#f53d2d] text-white py-3 px-4 rounded-xl hover:opacity-70 w-full"
              onClick={() => setStep(2)}
            >
              Go to the next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <Input name="city" placeholder="City" register={register} />
            <Input name="district" placeholder="District" register={register} />
            <Input name="ward" placeholder="Ward" register={register} />
            <Input name="address_line" placeholder="Detail Address" register={register} />
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-gray-400 text-white py-3 px-4 rounded-xl hover:bg-gray-500"
                onClick={() => setStep(1)}
              >
                Back to previous page
              </button>
              <button
                type="submit"
                className="bg-gradient-to-b from-[#d0011b] to-[#f53d2d] hover:opacity-70 text-white py-2 px-8 rounded-xl hover:bg-green-600"
                onClick={() => {if(errors.nameShop || errors.phoneShop) setStep(1)}}
              >
                Complete Registering
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
