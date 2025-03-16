import React from "react";
import { useLocation } from "react-router-dom";
import { stateProps } from "../Cart/Cart";
import { useQuery } from "@tanstack/react-query";
import orderApi from "@uth/apis/order.api";
import Button from "@uth/components/Button";

const CheckoutPage = () => {
  const location = useLocation();
  const {data: checkoutData} = useQuery({
    queryKey: ['checkout'],
    queryFn: () => orderApi.getMyCheckout(location.state._id)
  })
  console.log('run', checkoutData, '>>>', location.state.data)
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


        {checkoutData?.result?.orders?.map((item, index) => {
          const selected_shipping_info = item?.shipping_channel_id_selected || 2
           
          return <div key={index} className="bg-white mt-12 p-4 px-8 rounded-lg shadow-md mb-6 cursor-pointer hover:shadow-xl hover:-translate-y-[0.10rem]">
            <div className="flex gap-4 items-center text-base">
              <span className="bg-orange p-1 text-sm rounded text-white">Yêu thích</span>
              {item?.items?.[0].shop_name}
            </div>
            {item?.items?.map((product) => {
              return  <div className="grid grid-cols-12 justify-between items-center">
                <div className="flex col-span-7 items-center mt-8">
                  <img src={product.image} alt="Product" className="w-16 h-16 mr-4" />
                  <div className="grid gap-2">
                    <span className="block font-medium truncate max-w-md">{product?.variant_name || product?.product_name}</span>
                    <span className="text-gray-600">₫{product?.price?.toLocaleString('VN')}</span>
                  </div>
                </div>
                <div className="col-span-5 flex justify-between text-center items-center">
                    <div className="">đ{product?.price?.toLocaleString('VN')}</div>
                    <div className="mr-5">{product?.quantity}</div>
                    <div className="mr-4 text-gray-600">₫{((product?.price || 1000) * product?.quantity).toLocaleString('VN')}</div>
                </div>
              </div>
            })}
            <div className="h-[1px] w-full bg-gray-300 my-12" />

            <div className="bg-white grid grid-cols-10 gap-16 p-6 rounded-lg  mt-6">
              {/* Hóa đơn điện tử & Voucher */}
              <div className="col-span-4">
                <div className="flex justify-between items-center border-b pb-4">
                  <div className="text-gray-700 font-medium">
                    Hóa đơn điện tử
                  </div>
                  <a href="#" className="text-blue-500 hover:underline">
                    Yêu Cầu Ngay
                  </a> 
                </div>

                {/* Lời nhắn */}
                <div className="mt-8">
                  <label className="block text-gray-700 font-medium mb-2">Lời nhắn:</label>
                  <input
                    type="text"
                    placeholder="Lưu ý cho Người bán..."
                    className="w-full px-3 mt-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>

              {/* Phương thức vận chuyển */}
              <div className="mt-6 col-span-6 flex justify-between items-center border-b pb-4">
                <div>
                  <span className="text-gray-700 font-medium">Phương thức vận chuyển:</span>{" "}
                  <span className="text-green-600 font-semibold">{item?.shipping_info?.[selected_shipping_info]?.name}</span>
                  <span className="text-gray-600 ml-4 font-semibold">đ{item?.shipping_info?.[selected_shipping_info]?.fee?.toLocaleString('VN')}</span>
                  <p className="text-sm text-green-600 mt-1">
                    🚚 Đảm bảo nhận hàng từ <strong>{item?.shipping_info?.[selected_shipping_info]?.delivery_text}</strong>
                  </p>
                  <p className="text-xs text-gray-500">
                    Nhận Voucher trị giá <strong>15.000</strong> nếu đơn hàng được giao đến bạn sau ngày 20 Tháng 3 2025.
                  </p>
                </div>
                <a href="#" className="text-blue-500 hover:underline">
                  Thay Đổi
                </a> 
              </div>


            </div>
              {/* Tổng số tiền */}
              <div className="mt-6 flex justify-between items-center text-lg font-semibold text-red-500">
                <span>Tổng số tiền ({item?.items_count} sản phẩm):</span>
                <span>₫{item?.total_items_price?.toLocaleString('VN')}</span>
              </div>
          </div>
        })}

        {/* Insurance */}
        <div className="flex items-center mb-6 mt-8">
          <input type="checkbox" id="insurance" className="mr-2" />
          <label htmlFor="insurance" className="text-gray-600">
            Bảo hiểm Thiệt hại sản phẩm
          </label>
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
            <span className="text-gray-600">đ{checkoutData?.result.total_products_price?.toLocaleString('VN')}</span>
          </div>
          <div className="flex justify-between mb-6">
            <span className="text-lg">Tổng tiền phí vận chuyển</span>
            <span className="text-gray-600">₫{checkoutData?.result?.total_ship_fee?.toLocaleString('VN')}</span>
          </div>
          <div className="flex justify-between mb-6">
            <span className="font-bold text-lg">Tổng thanh toán</span>
            <span className="font-bold text-red-500 text-lg">₫{checkoutData?.result?.total_price?.toLocaleString('VN')}</span>
          </div>

          {/* Button */}
          <Button className="w-full py-3 bg-red-500 text-white rounded-lg">Đặt hàng</Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
