import { Link } from 'react-router-dom'
import freeshipImage from '@uth/assets/images/freeship.jpeg'
import { Price, Product } from '@uth/types/product.type'
import path from '@uth/constants/path'
import { generateNameId } from '@uth/utils/utils'

export default function Product({product}: {product: Product}) {
  
  if(!product) return
  return (
    <Link to={`${path.product}/${generateNameId({
      name: product?.title as string,
      id: product?.product_id as number
    })}`}>
    <div className='bg-white shadow rounded-xl hover:translate-y-[-0.0625rem]  duration-100 transition-transform hover:shadow-lg hover:shadow-orange'>
      <div className='w-full pt-[100%] relative'>
        <img 
          src={product?.image_urls?.[0]}
          alt={product?.title}
          className='absolute top-0 bg-white w-full h-full object-cover rounded-t-xl'
        />
        <img src={freeshipImage} className='w-12 h-7 absolute bottom-0 object-cover' alt="" />
      </div>
      <div className="p-2 overflow-hidden">
        <div className='min-h-[1.75rem] line-clamp-2 text-sm'>{product.title}</div>
        <div className="flex items-center mt-3">
          <span className='text-xs text-orange'>₫</span>
          <span className="text-md max-w-[50%] text-orange truncate">{(product.product_price.price!).toLocaleString('vi-VN')}</span>
          <span className='text-xs px-1 text-orange bg-[#ee4d2d]/10 ml-2 rounded-sm'>-{product.product_price.discount}%</span>
        </div>
        <div className="flex mb-2 items-center space-x-1 mt-6">
          <div className='flex-none flex items-center space-x-0.5 mr-1'>
            <img 
              src="https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.45/pc/d7099d3fd1dfdaf705ab.svg" alt="" 
              width={10}
              height={10}
            />
            <div className='text-xs'>{(Math.random() * 3 + 2).toFixed(1)}</div>
          </div>
          <div className='text-xs'>Đã bán <span>{Math.floor(Math.random() * 10000 + 10)}</span></div>
        </div>
        <div className='flex items-center gap-1 max-w-full'>
          <img src="https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.45/pc/5dd7b4560d0e2d3190e8.svg" alt="" />
          <div className='text-xs'>{Math.floor(Math.random() * 2) ? "Hà Nội" : "TP.HCM"}</div>
        </div>
      </div>
    </div>
  </Link>)
}
