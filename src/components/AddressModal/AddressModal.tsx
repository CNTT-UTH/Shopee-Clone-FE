import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../Input';  
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';   
import { useMutation, useQuery } from '@tanstack/react-query';
import addressApi from '@uth/apis/addresses.api';
import { toast } from 'react-toastify';
import { AddressSchema, addressSchemaType } from '@uth/types/address.type';
 
 

const classNameError = 'ml-2 mb-3 -mt-2 text-red-600 min-h-[1.25rem] text-sm';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddressModal({ isOpen, onClose }: AddressModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<addressSchemaType>({
    resolver: yupResolver(AddressSchema),
  });
  const [districts, setDistricts] = useState<string>('');
  const [wards, setWards] = useState<string>('');

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedWardName, setSelectedWardName] = useState<string | null>(null);

  const { data: cities } = useQuery(['cities'], addressApi.getAllCities);
  const { data: districtData } = useQuery(
    ['districts', districts],
    () => addressApi.getAllDistricts(+districts),
    { enabled: !!districts }
  );
  const { data: wardsData } = useQuery(
    ['wards', wards],
    () => addressApi.getAllWards(+wards),
    { enabled: !!wards }
  );

  const addressMutation = useMutation({
    mutationFn: (data: addressSchemaType) => axios.post('/api/address', data),
    onSuccess: () => {
      toast.success('Address saved successfully');
      onClose();  // Close modal after success
    },
    onError: (error) => {
      toast.error('Error saving address');
      console.error(error);
    }
  });

  const onSubmit: SubmitHandler<addressSchemaType> = async (data) => {
    const formData = {
      address_line: data.address_line,
      phone_number: data.phone_number,
      city: selectedCity || '',
      district: selectedDistrict || '',
      ward: selectedWardName || '',
    };
    // addressMutation.mutate(formData);
    console.log(formData)
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-center text-lg font-semibold">Enter Address</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              name="address_line"
              placeholder="Address Line"
              register={register}
              errorMessage={errors.address_line?.message}
            />
          </div>

          {/* City Select */}
          <select
            {...register('city')}
            onChange={(e) => {
              setSelectedCity(e.target.selectedOptions[0].text);
              setDistricts(e.target.value);
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
          <div className={classNameError}>{errors.city?.message}</div>

          {/* District Select */}
          <select
            {...register('district')}
            onChange={(e) => {
              setSelectedDistrict(e.target.selectedOptions[0].text);
              setWards(e.target.value);
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
          <div className={classNameError}>{errors.district?.message}</div>

          {/* Ward Select */}
          <select
            {...register('ward')}
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
          <div className={classNameError}>{errors.ward?.message}</div>

          {/* Phone Number */}
          <Input
            name="phone_number"
            placeholder="Phone Number"
            register={register}
            errorMessage={errors.phone_number?.message}
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-400 text-white py-3 px-4 rounded-xl hover:bg-gray-500"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-gradient-to-b from-[#d0011b] to-[#f53d2d] text-white py-3 px-4 rounded-xl hover:opacity-70"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
