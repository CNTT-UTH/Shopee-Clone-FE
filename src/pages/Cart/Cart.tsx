import InputQuantity from '@uth/components/InputQuantity'
import path from '@uth/constants/path'
import { useCart } from '@uth/queries/useCart'
import { generateNameId } from '@uth/utils/utils'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Cart() {
    const {data, isLoading} = useCart()
    const cartData = data?.result.items

    return (
      <div className='bg-neutral-100 py-16'>
        <div className="container">
          <div className="overflow-auto">
            <div className='min-w-[1000px]'>
              <div className="grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow">
                <div className="col-span-6">
                  <div className="flex items-center">
                    <div className="flex flex-shrink-0 items-center justify-center pr-3">
                      <input type="checkbox" className='h-5 w-5 cursor-pointer accent-orange' id="" />
                    </div>
                    <div className="flex-grow text-black">Sản phẩm</div>
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="grid grid-cols-5 text-center">
                    <div className="cols-span-2">Đơn giá</div>
                    <div className="cols-span-1">Số lượng</div>
                    <div className="cols-span-1">Số tiền</div>
                    <div className="cols-span-1">Thao tác</div>
                  </div>
                </div>
              </div>
              <div className="my-3 rounded-sm bg-white p-5 shadow">
                {cartData?.map((item, index) => (
                  <div
                    key={index}
                    className='grid grid-cols-12 rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500'
                  >
                    <div className="col-span-6">
                      <div className="flex">
                        <div className="flex flex-shrink-0 items-center justify-center pr-3">
                          <input type="checkbox" className='h-5 w-5 cursor-pointer accent-orange' id="" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex">
                            <Link to={`${path.product}/${generateNameId({
                                name: item?.product_name as string,
                                id: item?.product_id as number
                              })}`} 
                              className="h-20 w-20 flex-shrink-0"
                            >
                              <img src={item?.image} alt="" />
                            </Link>
                            <div className="flex-grow px-2 pt-1 pb-2">
                              <Link to={`${path.product}/${generateNameId({
                                name: item?.product_name as string,
                                id: item?.product_id as number
                              })}`} className='line-clamp-2' >
                                {item?.product_name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <div className="grid grid-cols-5 items-center">
                        <div className="col-span-2">
                          <div className="flex items-center justify-center">
                            <span className="text-gray-300 line-through">
                              đ{item.price_before_discount?.toLocaleString('VN')}
                            </span>
                            <span className="ml-3">đ{item.price?.toLocaleString('VN')}</span>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <InputQuantity 
                            max={50}
                            value={item.quantity}
                            classNameWrapper='flex items-center'
                          />
                        </div>
                        <div className="col-span-1 ml-1">
                          <span className="text-orange">đ{((item?.price || 1) * (item?.quantity || 1)).toLocaleString('VN')}</span>
                        </div>
                        <div className="col-span-1">
                          <button className='bg-orange/10 p-2 rounded-lg text-black transition-colors hover:text-orange'>Xóa</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
