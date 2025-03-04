import { useProductDetail } from '@uth/queries/useProduct'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams } from 'react-router-dom'

export default function ProductDetail() {
  const {id} = useParams()

  const {data} = useProductDetail(id as string)
  const productData = data?.result
  if(!productData) return
  const tmp = +Math.floor((Math.random() * 20000 + 1000) / 1000).toFixed(1) 
  
  return (
    <div className='bg-gray-200 py-6'>
      <div className="bg-white p-4 shadow">
        <div className="container"> 
          <div className="grid grid-cols-12 gap-9">
            <div className="col-span-5">
              <div className="relative w-full pt-[100%] shadow">
                <img 
                  src={productData.image_urls?.[0]}
                  alt={productData.title}
                  className='absolute top-0 bg-white w-full h-full object-cover rounded-lg'
                />
              </div>
              <div className="relative mt-4 grid grid-cols-5 gap-1">
                <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <FaChevronLeft />
                </button>
                {productData.image_urls?.slice(0, 5).map((image, index) => {
                  const isActive = index === 0
                  return (
                    <div key={index} className='relative w-full pt-[100%]'>
                      <img 
                        src={image} 
                        className='absolute top-0 cursor-pointer bg-white w-full h-full object-cover rounded-lg'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                    </div>
                  )
                })}
                <button className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <FaChevronRight />
                </button>
              </div>
            </div>
            <div className="col-span-7">
                <div>
                  <img className='inline mr-1 -mt-2' src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/5f1ccc915066fa7bb851.svg" alt="" />
                  <span className="font-medium uppercase text-xl">{productData.title} </span>
                </div>
                <div className="mt-2 flex items-center">
                  <div className="flex items-center justify-center">
                    <div className="mt-2 text-sm">
                      <span>{tmp}k</span>
                      <span className='ml-1'>Đánh Giá</span>
                    </div>
                    <div className="mt-2 h-5 w-[1px] mx-4 bg-gray-300"></div>
                    <div className="mt-2 text-sm">
                      <span>{(tmp * +(Math.random() * 3 + 3)).toFixed(1)}k</span>
                      <span className='ml-1'>Đánh Giá</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
                  <div className="text-3xl font-medium text-orange">đ{productData?.product_price?.price?.toLocaleString('vi-VN')} - đ{productData?.product_price?.range_max?.toLocaleString('vi-VN')}</div>
                  {/* <div className="ml-6 text-gray-500 line-through">đ{productData?.product_price?.price_before_discount?.toLocaleString('vi-VN')} - đ{productData?.product_price?.range_max_before_discount?.toLocaleString('vi-VN')}</div> */}
                  <div className="ml-4 rounded-sm bg-orange px-1 py-[2xl] text-xs font-semibold uppercase text-white">
                    {(productData?.product_price?.discount as number) * 100}% GIẢM
                  </div>
                </div>

                <div className='flex mt-8'>
                  <div className='mr-2'>{productData?.options?.[0].name}:</div>
                  <div className='flex items-center ml-4 -mt-1 flex-wrap gap-2'>
                    {productData.options?.[0].value?.map((item, index) => {
                      return <div className='border px-4 py-1 rounded-md shadow cursor-pointer hover:shadow-lg'>{item}</div>
                    })}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
