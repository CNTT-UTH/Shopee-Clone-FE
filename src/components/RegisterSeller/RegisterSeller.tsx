import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';  // Dùng axios để gọi API
import { useQuery } from '@tanstack/react-query';
import addressApi from '@uth/apis/addresses.api';

const RegisterSellerSchema = yup.object().shape({
  nameShop: yup.string().required('Shop name is required'),
  phoneShop: yup.string().required('Shop phone is required'),
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

  const [districts, setDistricts] = useState<string>('')
  const [wards, setWards] = useState<string>('')

  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)
  const [selectedWardName, setSelectedWardName] = useState<string | null>(null);

  const {data: cities, isLoading: citiesLoading, error: citiesError} = useQuery({
    queryKey: ['city'],
    queryFn: addressApi.getAllCities
  })

  const {data: districtData, isLoading: districtsLoading, error: districtsError} = useQuery({
    queryKey: ['districts', districts],
    queryFn: () => addressApi.getAllDistricts(+districts!),
    enabled: !!districts 
  })

  const {data: wardsData, isLoading: wardsLoading, error: wardsError} = useQuery({
    queryKey: ['wards', wards],
    queryFn: () => addressApi.getAllWards(+wards!),
    enabled: !!wards 
  })

  const onSubmit = handleSubmit((data) => {
    const formData = {
      ...data,
      city: selectedCity,
      district: selectedDistrict,
      ward: selectedWardName
    }
    console.log(formData, errors) 
  })

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
            {/* Chọn Thành phố */}
            <select
              {...register("city")}   
              
              onChange={(e) => {
                setSelectedCity(e.target.selectedOptions[0].text) 
                setDistricts(e.target.value) 
                console.log(e.target.selectedOptions)
              }} 
              className="w-full p-3 border rounded-xl mb-4"
            >
              <option value="">Select City</option>
              {cities?.result.map((city) => (
                <option key={city.code} value={city.code}>
                  {city.full_name}
                </option>
              ))}
            </select>

            {/* Chọn Quận */}
            <select
              {...register("district")}  
              onChange={(e) => {
                setSelectedDistrict(e.target.selectedOptions[0].text)
                setWards(e.target.value)
              }} 
              className="w-full p-3 border rounded-xl mb-4"
              disabled={!selectedCity} 
            >
              <option value="">Select District</option>
              {districtData?.result.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.full_name}
                </option>
              ))}
            </select>

            {/* Chọn Phường */}
            <select
              {...register("ward")} 
              className="w-full p-3 border rounded-xl mb-4"
              onChange={(e) => setSelectedWardName(e.target.selectedOptions[0].text)}
              disabled={!selectedDistrict} 
            >
              <option value="">Select Ward</option>
              {wardsData?.result.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.full_name}
                </option>
              ))}
            </select>

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
                onClick={() => {if(errors.nameShop || errors.phoneShop) setStep(1)}}              >
                Complete Registering
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
