import { addressSchemaType } from '@uth/types/address.type';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  address: addressSchemaType[]
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const AddressInfo = ({address, setIsModalOpen} : Props) => {
  const [addresses, setAddresses] = useState<addressSchemaType[]>(address);

  const [selectedAddress, setSelectedAddress] = useState<addressSchemaType | null>(null);

  const handleSelectAddress = (address: addressSchemaType) => {
    setSelectedAddress(address);
  }; 
  address[0] = {
    ...address[0],
    isDefault: true
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-center text-lg font-semibold">Địa Chỉ Của Tôi</h3>
        <div className="space-y-4">
          {addresses.map((address, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 border-b ${
                address.isDefault ? 'bg-gray-100' : ''
              }`}
            >
              <div>
                <p className="font-semibold">{address.city}</p>
                <p>{address.phone_number}</p>
                <p>{address.address_line}</p>
              </div>
              <div>
                <button
                  onClick={() => handleSelectAddress(address)}
                  className="text-blue-600"
                >
                  {address.isDefault ? 'Mặc Định' : 'Chọn'}
                </button>
              </div>
            </div>
          ))}
        </div>
        <button>Tạo mới</button>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-400 text-white py-3 px-4 rounded-xl hover:bg-gray-500"
          >
            Hủy
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gradient-to-b from-[#d0011b] to-[#f53d2d] text-white py-3 px-4 rounded-xl hover:opacity-70"
          >
            Xác Nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressInfo;
