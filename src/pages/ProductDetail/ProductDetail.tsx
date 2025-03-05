import InputNumber from '@uth/components/InputNumber'
import { useProductDetail } from '@uth/queries/useProduct'
import { FaChevronLeft, FaChevronRight, FaMinus, FaPlus, FaShopify } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { IoIosChatbubbles } from 'react-icons/io'
import { useEffect, useMemo, useRef, useState } from 'react'
import des from '@uth/assets/des/des'
import { sanitizeInput } from '@uth/utils/sanitize'
import FlashSale from '@uth/components/FlashSale'
export default function ProductDetail() {
  const { id } = useParams()
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [imgActive, setImgActive] = useState('')

  const { data, isLoading } = useProductDetail(id as string)
  const productData = data?.result
  const tmp = useMemo(() => +Math.floor((Math.random() * 20000 + 1000) / 1000).toFixed(1), [data])
  const sold = useMemo(() => (tmp * +(Math.random() * 3 + 3)).toFixed(1), [tmp])
  const currentImages = useMemo(
    () => productData?.image_urls?.slice(...currentIndexImages) || [],
    [productData, currentIndexImages]
  )
  useEffect(() => {
    if (productData) setImgActive(productData.image_urls?.[0] as string)
  }, [productData])

  const next = () => {
    console.log('next')
    if (productData && currentIndexImages[1] < productData?.image_urls!.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
      console.log('text')
    }
  }

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  if (isLoading) {
    ;<div role='status'>
      <svg
        aria-hidden='true'
        className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
        viewBox='0 0 100 101'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
          fill='currentColor'
        />
        <path
          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
          fill='currentFill'
        />
      </svg>
      <span className='sr-only'>Loading...</span>
    </div>
  }

  return (
    productData && (
      <div className='bg-gray-200 py-6'>
        <div className='container'>
          <div className='bg-white p-10 shadow rounded-md'>
            <div className='grid grid-cols-12 gap-12'>
              <div className='col-span-5'>
                <div className='relative w-full pt-[100%] shadow'>
                  <img
                    src={imgActive}
                    alt={productData.title}
                    className='absolute top-0 bg-white w-full h-full object-cover rounded-lg'
                  />
                </div>
                <div className='relative mt-4 grid grid-cols-5 gap-1'>
                  <button
                    className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                    onClick={prev}
                  >
                    <FaChevronLeft />
                  </button>
                  {currentImages?.map((image, index) => {
                    const isActive = image === imgActive
                    return (
                      <div
                        key={index}
                        className='relative w-full pt-[100%] cursor-pointer'
                        onMouseEnter={() => setImgActive(image)}
                      >
                        <img
                          src={image}
                          className='absolute top-0 cursor-pointer bg-white w-full h-full object-cover rounded-lg'
                        />
                        {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                      </div>
                    )
                  })}
                  <button
                    onClick={next}
                    className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
              <div className='col-span-7'>
                <div>
                  <img
                    className='inline mr-1 -mt-2'
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/5f1ccc915066fa7bb851.svg'
                    alt=''
                  />
                  <span className='font-medium uppercase text-xl'>{productData.title} </span>
                </div>
                <div className='mt-2 flex items-center'>
                  <div className='flex items-center justify-center'>
                    <div className='mt-2 text-sm'>
                      <span>{tmp}k</span>
                      <span className='ml-1'>Đánh Giá</span>
                    </div>
                    <div className='mt-2 h-5 w-[1px] mx-4 bg-gray-300'></div>
                    <div className='mt-2 text-sm'>
                      <span>{sold}k</span>
                      <span className='ml-1'>Đã bán</span>
                    </div>
                  </div>
                </div>

                {productData.product_id! % 2 === 0 ? (
                  <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                    <div className='text-3xl font-medium text-orange'>
                      đ{productData?.product_price?.price?.toLocaleString('vi-VN')} - đ
                      {productData?.product_price?.range_max?.toLocaleString('vi-VN')}
                    </div>
                    <div className='ml-4 rounded-sm bg-orange px-1 py-[2xl] text-xs font-semibold uppercase text-white'>
                      {(productData?.product_price?.discount as number) * 100}% GIẢM
                    </div>
                  </div>
                ) : (
                  <FlashSale
                    discount={productData.product_price.discount as number}
                    salePrice={productData.product_price.price as number}
                    originalPrice={productData.product_price.price_before_discount as number}
                  />
                )}

                <div className='mt-12 flex items-center'>
                  <div className='text-gray-500'>Deal Sốc</div>
                  <div className='text-orange ml-10 rounded-md px-3 p-1 bg-orange/10 flex-inline'>Mua để nhận quà</div>
                </div>

                <div className='mt-12'>
                  {productData.options?.map((value, index) => {
                    return (
                      <div key={index} className='grid grid-cols-12 mt-8'>
                        <div className='col-span-2 text-gray-500'>{value.name}</div>
                        <div key={index} className='flex items-center col-span-10 -mt-1 flex-wrap gap-2'>
                          {value.value?.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className='border px-4 py-1 rounded-md shadow cursor-pointer hover:shadow-lg'
                              >
                                {item}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className='mt-12 grid grid-cols-12 items-center'>
                  <div className='text-gray-500 capitalize col-span-2'>Số lượng</div>
                  <div className='ml-4 col-span-10 flex -ml-0.5 items-center'>
                    <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                      <FaMinus />
                    </button>
                    <InputNumber
                      value={1}
                      className=''
                      classNameInput='h-8 w-14 border-b border-t border-gray-300 p-1 text-center outline-none'
                      classNameError='hidden'
                    />
                    <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                      <FaPlus />
                    </button>
                    <div className='ml-6 text-sm text-gray-500'>{tmp * 2379} sản phẩm có sẵn</div>
                  </div>
                </div>

                <div className='mt-12 flex items-center'>
                  <button className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'>
                    <svg
                      enableBackground='new 0 0 15 15'
                      viewBox='0 0 15 15'
                      x={0}
                      y={0}
                      className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                    >
                      <g>
                        <g>
                          <polyline
                            fill='none'
                            points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeMiterlimit={10}
                          />
                          <circle cx={6} cy='13.5' r={1} stroke='none' />
                          <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                        </g>
                        <line
                          fill='none'
                          strokeLinecap='round'
                          strokeMiterlimit={10}
                          x1='7.5'
                          x2='10.5'
                          y1={7}
                          y2={7}
                        />
                        <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                      </g>
                    </svg>
                    Thêm vào giỏ hàng
                  </button>
                  <button className='fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'>
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container mt-8'>
          <div className='bg-white grid grid-cols-1 md:grid-cols-12 rounded-xl border-b p-10 mb-4'>
            <div className='col-span-4 flex md:block lg:flex'>
              <div className='w-19 h-19'>
                <img
                  className='rounded-full w-full h-full object-cover'
                  src='https://down-vn.img.susercontent.com/file/vn-11134216-7r98o-lq8yyfzf3t1u35@resize_w80_nl.webp'
                  alt=''
                />
              </div>
              <div className='ml-4'>
                <p className='text-lg'>{productData.shop.name}</p>
                <p className='text-md text-gray-500 mt-2'>Online {productData.product_id} Phút Trước</p>
                <div className='flex gap-2 mt-3'>
                  <button className='flex gap-1 items-center px-3 py-2 border text-orange bg-orange/10 rounded-md border-orange'>
                    <IoIosChatbubbles />
                    Chat Ngay
                  </button>
                  <button className='flex gap-1 items-center px-3 py-2 border text-gray-500 border-gray-600 rounded-md'>
                    <FaShopify />
                    Xem Shop
                  </button>
                </div>
              </div>
            </div>
            <div className='hidden md:block col-span-1 w-[1px] mx-10 h-full bg-gray-300' />
            <div className='col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mt-4 md:mt-0'>
              <div>
                <p>Đánh Giá</p>
                <p className='text-red-500 font-bold'>647,6k</p>
              </div>
              <div>
                <p>Tỉ Lệ Phản Hồi</p>
                <p className='text-red-500 font-bold'>98%</p>
              </div>
              <div>
                <p>Sản Phẩm</p>
                <p className='text-red-500 font-bold'>280</p>
              </div>
              <div>
                <p>Thời Gian Phản Hồi</p>
                <p className='text-red-500 font-bold'>trong vài giờ</p>
              </div>
              <div>
                <p>Tham Gia</p>
                <p className='text-red-500 font-bold'>6 năm trước</p>
              </div>
              <div>
                <p>Người Theo Dõi</p>
                <p className='text-red-500 font-bold'>1,1tr</p>
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='mt-8 bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeInput(des[0])
                }}
              />
              <img src={productData?.image_urls?.[0]} className='w-[60%] mt-10 object-cover mb-8' alt='' />
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeInput(des[1])
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  )
}
