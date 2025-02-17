// components/Sidebar.tsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { FaCartShopping } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";

const SidebarSeller = () => {
  const [openOrder, setOpenOrder] = useState(true)  
  const [openProduct, setOpenProduct] = useState(true)  

  return (
    <div className="bg-neutral-500 rounded-lg text-white h-full w-64 p-4 py-10">
      <div className="space-y-4">
        
        <div>
          <button
            className="flex items-center justify-between w-full py-2 px-4 hover:bg-gray-700 rounded-md"
            onClick={() => setOpenOrder(!openOrder)}
          >
            <div className='flex items-center gap-2'>
              <FaBoxOpen />
              <span>Manage Order</span>
            </div>
            <div>{openOrder ? <HiChevronUp /> : <HiChevronDown />}</div>
          </button>
          {openOrder && (
            <ul className="pl-4 mt-2 space-y-2">
              <li>
                <Link to="/orders/all" className="block py-2 px-4 hover:bg-gray-700 rounded-md">Tất cả</Link>
              </li>
              <li>
                <Link to="/orders/bulk" className="block py-2 px-4 hover:bg-gray-700 rounded-md">Giao hàng loạt</Link>
              </li>
              <li>
                <Link to="/orders/canceled" className="block py-2 px-4 hover:bg-gray-700 rounded-md">Đơn huỷ</Link>
              </li>
              <li>
                <Link to="/orders/returns" className="block py-2 px-4 hover:bg-gray-700 rounded-md">Trả hàng/Hoàn tiền</Link>
              </li>
              <li>
                <Link to="/orders/shipping-settings" className="block py-2 px-4 hover:bg-gray-700 rounded-md">Cài đặt vận chuyển</Link>
              </li>
            </ul>
          )}
        </div>

        {/* Quản lý sản phẩm */}
        <div>
          <button
            className="flex items-center justify-between w-full py-2 px-4 hover:bg-gray-700 rounded-md"
            onClick={() => setOpenProduct(!openProduct)}
          >
            <div className='flex items-center gap-2'>
              <FaCartShopping />
              <span>Manage Product</span>
            </div>
            {openProduct ? <HiChevronUp /> : <HiChevronDown />}
          </button>
          {openProduct && (
            <ul className="pl-4 mt-2 space-y-2">
              <li>
                <Link to="/products/all" className="block py-2 px-4 hover:bg-gray-700 rounded-md">Tất cả Sản Phẩm</Link>
              </li>
              <li>
                <Link to="/products/add" className="block py-2 px-4 hover:bg-gray-700 rounded-md">Thêm Sản Phẩm</Link>
              </li>
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}

export default SidebarSeller
