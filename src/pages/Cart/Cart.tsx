import { useMutation } from '@tanstack/react-query'
import cartApi from '@uth/apis/cart.api'
import Button from '@uth/components/Button'
import InputQuantity from '@uth/components/InputQuantity'
import Product from '@uth/components/Product'
import path from '@uth/constants/path'
import { queryClient } from '@uth/main'
import { useCart } from '@uth/queries/useCart'
import { useProductAll } from '@uth/queries/useProduct'
import { CartItem } from '@uth/types/cart.type'
import { generateNameId } from '@uth/utils/utils'
import { produce } from 'immer'
// import { keyBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
 
interface stateProps extends CartItem {
  checked: boolean,
  disabled: boolean
}

export default function Cart() {
    const [ extendedPurchases, setExtendedPurchases ] = useState<stateProps[]>([])
    const deleteMutation = useMutation(cartApi.removeItemFromCart)

    const {data, isLoading, refetch} = useCart()
    const cartData = data?.result.items
    const {data: productListData} = useProductAll()
    const isAllChecked = extendedPurchases.every((item) => item.checked)
    const updateToCartMutation = useMutation(cartApi.addToCart)

    
    useEffect(() => {
      setExtendedPurchases((prev) => {
        // const extendObj = keyBy(prev, 'id')
        return (
          cartData?.map(item => ({
            ...item,
            disabled: false,
            checked: Boolean(item.selected_to_checkout)
          })) || []
        )
      }
    )
    }, [cartData])

    const handleCheck = (cartIndex: number) => 
      async (event: React.ChangeEvent<HTMLInputElement>) => {
        setExtendedPurchases(
          produce((draft) => {
            draft[cartIndex].checked = event.target.checked;
          })
        );
        
        try {
          await updateToCartMutation.mutateAsync({
            product_id: extendedPurchases[cartIndex]?.product_id,
            shop_id: extendedPurchases[cartIndex]?.shop_id,
            product_variant_id: extendedPurchases[cartIndex]?.product_variant_id || undefined,
            selected_to_checkout: !extendedPurchases[cartIndex]?.checked,
            quantity: extendedPurchases[cartIndex].quantity
          })  
        } catch (error) {
          console.warn('Handle check fail', error)
        }
      };

    const handleCheckAll = async () => {
      setExtendedPurchases(prev => prev.map(item => ({
          ...item,
          checked: !isAllChecked
        })))

      try {
        const updatePromises = extendedPurchases.map(item =>
          updateToCartMutation.mutateAsync({
            product_id: item?.product_id,
            shop_id: item?.shop_id,
            product_variant_id: item?.product_variant_id || undefined,
            selected_to_checkout: !item?.checked,
            quantity: item.quantity
          })  
        );
      
        await Promise.all(updatePromises);
        console.log('Handle all checked is successful')
      } catch (error) {
        console.warn('Handle checked all fail', error)
      }
    }

    const handleDelete = async (id?: number) => {
      if(!id) return
      await deleteMutation.mutateAsync(id, {
        onSuccess: () => {
          toast.success("You have deleted product successfully")
          queryClient.invalidateQueries({queryKey: ['cart']})
        }, 
        onError: (error) => {
          console.warn('Delete product fail', error)
        }
      })
      
    }

    const handleInputQuantity = async (cartIndex: number, value: number) => {
      const item = extendedPurchases[cartIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[cartIndex].disabled = true
        })
      )
      await updateToCartMutation.mutateAsync({
        product_id: item?.product_id,
        shop_id: item?.shop_id,
        product_variant_id: item?.product_variant_id,
        quantity: value
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['cart']})
        }
      })
    }

    return (
      <div className='bg-neutral-100 py-16'>
        <div className="container">
          <div className="overflow-auto">
            <div className='min-w-[1000px]'>
              <div className="grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow">
                <div className="col-span-6">
                  <div className="flex items-center">
                    <div className="flex flex-shrink-0 items-center justify-center pr-3">
                      <input onChange={handleCheckAll} type="checkbox" checked={isAllChecked} className='h-5 w-5 cursor-pointer accent-orange' id="" />
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
                {extendedPurchases?.map((item, index) => (
                  <div
                    key={index}
                    className='mt-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500'
                  >
                    <div className="col-span-6">
                      <div className="flex">
                        <div className="flex flex-shrink-0 items-center justify-center pr-3">
                          <input checked={item?.checked} type="checkbox" onChange={handleCheck(index)} className='h-5 w-5 cursor-pointer accent-orange' id="" />
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
                            onIncrease={value => handleInputQuantity(index, value)}
                            onDecrease={value => handleInputQuantity(index, value)}
                            disabled={item.disabled}
                          />
                        </div>
                        <div className="col-span-1 ml-1">
                          <span className="text-orange">đ{((item?.price || 1) * (item?.quantity || 1)).toLocaleString('VN')}</span>
                        </div>
                        <div className="col-span-1">
                          <button onClick={() => handleDelete(item?.id)} type="button" className="py-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:text-orange/70 focus:z-10 focus:ring-4 focus:ring-orange/70">Xóa</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 sticky bottom-0 z-10 flex sm:flex-row flex-col sm:items-center rounded-sm bg-white border border-gray-300 p-5 shadow">
            <div className="flex items-center">
              <div className="flex flex-shrink-0 items-center justify-center pr-3">
                <input type="checkbox" checked={isAllChecked} onChange={handleCheckAll} className='h-5 w-5 accent-orange' name="" id="" />
              </div>
              <button className="mx-3 border-none bg-none">Chọn tất cả</button>
              <button className="mx-3 border-none bg-none">Xóa</button>
            </div>
            <div className="flex-col sm:flex-row sm:ml-auto flex sm:items-center mt-5 sm:mt-0">
              <div>
                <div className="flex items-center sm:justify-end">
                  <div>Tổng thanh toán ({cartData?.length || 0} sản phẩm):</div>
                  <div className="ml-2 text-2xl text-orange">đ{data?.result?.total?.toLocaleString('VN')}</div>
                </div>
                <div className="flex items-center sm:justify-end text-sm">
                  <div className='text-gray-500'>Tiết kiệm</div>
                  <div className="ml-6 text-orange">đ{(((data?.result?.total || 100000) * 0.25)).toLocaleString('VN')}</div>
                </div>
              </div>
              <Button className='flex mt-5 sm:mt-0 h-10 w-52 sm:ml-4 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600'>Mua hàng</Button>
            </div>
          </div>


          {/* product */}
          <div className="mt-16 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            <p className="text-gray-500 text-xl uppercase col-span-6">Có thể bạn cũng thích</p>
            {(productListData?.result?.data)?.map((product) => (
              <div className="col-span-1" key={product?.product_id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}
