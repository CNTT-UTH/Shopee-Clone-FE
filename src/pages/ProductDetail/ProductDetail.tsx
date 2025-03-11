import { useProductDetail } from '@uth/queries/useProduct'
import { FaChevronLeft, FaChevronRight, FaShopify } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { IoIosChatbubbles } from 'react-icons/io'
import { useEffect, useMemo, useState } from 'react'
import des from '@uth/assets/des/des'
import { sanitizeInput } from '@uth/utils/sanitize'
import shopName from '@uth/assets/images/shopName'
import InputQuantity from '@uth/components/InputQuantity'
import { useMutation } from '@tanstack/react-query'
import cartApi from '@uth/apis/cart.api'
import Loading from '@uth/components/Loading'
import { getIdFromNameId, getVariantId } from '@uth/utils/utils'
import { toast } from 'react-toastify' 
import React from 'react'
import { queryClient } from '@uth/main' 
import { useCart } from '@uth/queries/useCart'

export default function ProductDetail() {
  const {productSlug} = useParams()
  // console.log(productSlug)
  const id = getIdFromNameId(productSlug as string)
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [imgActive, setImgActive] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string,string>>({})
  const { data, isLoading } = useProductDetail(id as string)
  const productData = data?.result
  const tmp = useMemo(() => +Math.floor((Math.random() * 20000 + 1000) / 1000).toFixed(1), [data])
  const sold = useMemo(() => (tmp * +(Math.random() * 3 + 3)).toFixed(1), [tmp])
  const currentImages = useMemo(
    () => productData?.image_urls?.slice(...currentIndexImages) || [],
    [productData, currentIndexImages]
  )
  const {data: cartData} = useCart()
  const cartDataDetail = cartData?.result.items
  const addToCartMutation = useMutation(cartApi.addToCart)

  useEffect(() => {
    if (productData) setImgActive(productData.image_urls?.[0] as string)
  }, [productData])
 

  const next = () => { 
    if (productData && currentIndexImages[1] < productData?.image_urls!.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  } 

  const handleCount = (value: number) => {
    setQuantity(value)
  } 
  
  const _variantId = getVariantId({productData, selectedOptions})

  const checkOnCart = () => {
    return cartDataDetail?.find(item => item.product_variant_id === _variantId)?.quantity
  }
  console.log(checkOnCart()) 
   
  const addProduct = async () => {
      if(addToCartMutation.isLoading) return
      const checkCart = checkOnCart()
      const body = {
        product_id: productData?.product_id || 1,
        quantity: checkCart ? quantity + checkCart : quantity,
        shop_id: Number(productData?.shop?.shopid) || 1217321194
      }
      const bodyAddCart = _variantId ? {...body, variant_id: _variantId} : body
      await addToCartMutation.mutate(bodyAddCart, {
        onSuccess: (data) => {
          console.log('success', data)
          toast.success("Add/Update product successfully") 
          queryClient.invalidateQueries({queryKey: ['cart']})
        },
        onError: (error: any) => {
          console.log('error',error)
        }
      })
  }

  return (  
     <div className='bg-gray-200 py-6 relative'>
        {(isLoading || !productData)
        ? <Loading />
        : <React.Fragment>
            <div className='container min-h-[80vh]'>
              <div className='bg-white p-10 shadow rounded-md'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-12'>
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
                        className='absolute right-0 top-1/2 z-1 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
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
                      
                      <span className='font-medium uppercase text-xl'>{_variantId ? productData?.variants?.find(vItem => vItem.variant_id === _variantId)?.name : productData.title} </span>
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

                      <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                        {_variantId ?
                          <div className='text-3xl font-medium text-orange'>
                            đ{productData?.variants?.find(vItem => { 
                              return vItem.variant_id === _variantId
                            })?.price?.toLocaleString('VN')}
                          </div>
                        : <div className='text-3xl font-medium text-orange'>
                          đ{productData?.product_price?.price?.toLocaleString('vi-VN')} - đ
                          {productData?.product_price?.range_max?.toLocaleString('vi-VN')}
                        </div>}
                        <div className='ml-4 rounded-sm bg-orange px-1 py-[2xl] text-xs font-semibold uppercase text-white'>
                          {(productData?.product_price?.discount as number) * 100}% GIẢM
                        </div>
                      </div>

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
                                const isActive = selectedOptions[value.name as string] === item
                                return (
                                  <div
                                    key={index}
                                    className={`border px-4 py-1 rounded-md shadow cursor-pointer hover:shadow-lg ${isActive ? "border-orange text-orange" : ""}`}
                                    onClick={() => setSelectedOptions(prev => ({...prev, [value.name!]: item}))}
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
                        <InputQuantity max={100} onDecrease={handleCount} onIncrease={handleCount} onType={handleCount} value={quantity} />
                        <div className='ml-6 text-sm text-gray-500'>{tmp * 2379} sản phẩm có sẵn</div>
                      </div>
                    </div>

                    <div className='mt-12 flex items-center'>
                      <button onClick={addProduct} className={`${(Object.keys(selectedOptions).length !== productData.options?.length) && 'cursor-not-allowed opacity-50'} flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5`}>
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
                      <button className={`${(Object.keys(selectedOptions).length !== productData.options?.length) && 'cursor-not-allowed opacity-50'} fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90`}>
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
                      className='rounded-full max-w-19 ml-4 object-cover'
                      src={shopName[productData?.product_id! % 6]}
                      alt=''
                    />
                  </div>
                  <div className='ml-4'>
                    <p className='text-lg'>{productData?.shop?.name || 'Shopee Food'}</p>
                    <p className='text-md text-gray-500 mt-2'>Online {productData?.product_id} Phút Trước</p>
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
          </React.Fragment>}
      </div>
  )
}
