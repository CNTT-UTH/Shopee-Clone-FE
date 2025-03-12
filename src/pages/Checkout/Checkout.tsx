import React from "react";
import { useLocation } from "react-router-dom";
import { stateProps } from "../Cart/Cart";

const CheckoutPage = () => {
  const location = useLocation();

  // Lấy dữ liệu state từ location
  const data = location.state?.data as stateProps[];
  const totalCheckedPrice = data.reduce((result, current) => {
    return result + (current.price! * current.quantity) 
  }, 0)

  const voucher = totalCheckedPrice * 0.15

  return (
    <div className="bg-gray-100 py-20">
      {/* Header */}
      <div className="container bg-white p-8 rounded-lg flex justify-between items-center mb-8">
        <div className="flex flex-col gap-2">
          <span className="text-xl font-bold">Địa Chỉ Nhận Hàng</span>
          <span>Phan Đức Tài (+84) 917642510, gần tập hóa 2 Lâm, chợ Tân Việt Hòa, Phường 6, Thành Phố Cao Lãnh, Đồng Tháp</span>
        </div>
        <button className="text-blue-500">Thay Đổi</button>
      </div>
      <div className="container bg-white p-4">

        {/* Products */}
        <div className="grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow">
            <div className="col-span-7 flex-grow text-black text-xl">
               Sản phẩm 
            </div>
            <div className="col-span-5 flex items-center justify-between text-center">
              <div className="text-lg">Đơn giá</div>
              <div className="text-lg">Số lượng</div>
              <div className="text-lg">Thành tiền</div> 
            </div>
          </div>


        {data.map((item, index) => (
          <div className="bg-white p-4 px-8 rounded-lg shadow-md mb-6 cursor-pointer hover:shadow-xl hover:-translate-y-[0.10rem]">
            <div className="grid grid-cols-12 justify-between items-center">
              <div className="flex col-span-7 items-center">
                <img src={item.image} alt="Product" className="w-16 h-16 mr-4" />
                <div className="grid gap-2">
                  <span className="block font-medium truncate max-w-md">{item?.product_name}</span>
                  <span className="text-gray-600">₫{item?.price?.toLocaleString('VN')}</span>
                </div>
              </div>
              <div className="col-span-5 flex justify-between text-center items-center">
                  <div className="">đ{item?.price?.toLocaleString('VN')}</div>
                  <div className="mr-5">{item?.quantity}</div>
                  <div className="mr-4 text-gray-600">₫{((item?.price || 1000) * item?.quantity).toLocaleString('VN')}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Insurance */}
        <div className="flex items-center mb-6">
          <input type="checkbox" id="insurance" className="mr-2" />
          <label htmlFor="insurance" className="text-gray-600">
            Bảo hiểm Thiệt hại sản phẩm
          </label>
        </div>

        {/* Delivery */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <span className="text-gray-600">Phương thức vận chuyển: </span>
            <span className="font-semibold text-blue-500 ml-2">Nhanh</span>
          </div>
          <span className="text-gray-600">₫43.900</span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-6">
          <span className="font-bold text-xl">Tổng số tiền ({data?.length} sản phẩm):</span>
          <span className="font-bold text-red-500 text-xl">₫{totalCheckedPrice?.toLocaleString('VN')}</span>
        </div> 

        {/* Payment */}
        <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between mb-4">
            <span className="text-lg">Shopee Voucher</span>
            <span className="text-gray-600">Giảm đ{voucher.toLocaleString('VN')}</span>
          </div>
          <div className="flex justify-between mb-6">
            <span className="text-lg">Tổng tiền hàng</span>
            <span className="text-gray-600">đ{totalCheckedPrice.toLocaleString('VN')}</span>
          </div>
          <div className="flex justify-between mb-6">
            <span className="text-lg">Tổng tiền phí vận chuyển</span>
            <span className="text-gray-600">₫43.900</span>
          </div>
          <div className="flex justify-between mb-6">
            <span className="font-bold text-lg">Tổng thanh toán</span>
            <span className="font-bold text-red-500 text-lg">₫{(totalCheckedPrice * 0.9 - 43900).toLocaleString('VN')}</span>
          </div>

          {/* Button */}
          <button className="w-full py-3 bg-red-500 text-white rounded-lg">Đặt hàng</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
