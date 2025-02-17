import React from 'react'
import { Link } from 'react-router-dom'
import freeshipImage from '@uth/assets/images/freeship.jpeg'

export default function Product() {
  return <Link to="/">
    <div className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform'>
      <div className='w-full pt-[100%] relative'>
        <img 
          src="https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m5awwl3dvs3nba@resize_w450_nl.webp"
          className='absolute top-0 bg-white w-full h-full object-cover'
        />
        <img src={freeshipImage} className='w-12 h-7 absolute bottom-0 object-cover' alt="" />
      </div>
      <div className="p-2 overflow-hidden">
        <div className='min-h-[1.75rem] line-clamp-2 text-sm'>
          Sách - Combo 6 Cuốn: Cổ Học Kỳ Thư + Tư Duy Mở + Tư Duy Ngược
        </div>
        <div className="flex items-center mt-3">
          <span className='text-xs text-orange'>₫</span>
          <span className="text-md max-w-[50%] text-orange truncate">299.000</span>
          <span className='text-xs px-1 text-orange bg-[#ee4d2d]/10 ml-2 rounded-sm'>-21%</span>
        </div>
        <div className="flex mb-2 items-center space-x-1 mt-6">
          <div className='flex-none flex items-center space-x-0.5 mr-1'>
            <img 
              src="https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.45/pc/d7099d3fd1dfdaf705ab.svg" alt="" 
              width={10}
              height={10}
            />
            <div className='text-xs'>4.8</div>
          </div>
          <div className='text-xs'>Đã bán <span>192</span></div>
        </div>
        <div className='flex items-center gap-1 max-w-full'>
          <img src="https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.45/pc/5dd7b4560d0e2d3190e8.svg" alt="" />
          <div className='text-xs'>Hà Nội</div>
        </div>
      </div>
    </div>
  </Link>
}
