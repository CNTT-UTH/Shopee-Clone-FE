
import { Link } from 'react-router-dom'
import reactImg from '../../assets/react.svg'
import logo from '../../assets/images/logo.svg'
import { arrow, FloatingPortal, offset, shift, useFloating } from '@floating-ui/react';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from "motion/react"
import Popover from '../Popover';

export default function Header() {

  const infoPopover = (
      <div className="flex flex-col py-1 px-1">
        <button className='hover:bg-gray-50 hover:text-orange py-3 px-3 rounded-md'>English</button>
        <button className='hover:bg-gray-50 hover:text-orange py-3 px-3 rounded-md'>Tieng Viet</button>
      </div>)

  const avatarPopover = (<div className='px-1 py-1'>
    <Link to='/' className='block py-2 px-3 hover:bg-gray-50 hover:text-cyan-500 rounded-md'>My Account</Link>
    <Link to='/' className='block py-2 px-3 hover:bg-gray-50 hover:text-cyan-500 rounded-md'>Order</Link>
    <button  className='block w-full text-left py-2 px-3 hover:bg-gray-50 hover:text-cyan-500 rounded-md'>Log Out</button>
  </div>)

  return (
    <div className="pb-4 pt-2 bg-gradient-to-b from-[#d0011b] to-[#f53d2d]">
      <div className="container">
        <div className="flex justify-end text-white text-sm">
          <Popover 
            infoPopover={infoPopover}
            className={"flex items-center py-1 hover:text-gray-300 cursor-pointer"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg> 
            <span className="mx-1">English</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </Popover>  

          <Popover 
            infoPopover={avatarPopover}
            className={"flex items-center py-1 hover:text-gray-300 hover:cursor-pointer ml-4"}
          >
            <div className="mx-2 w-6 h-6 bg-white flex-shrink-0 rounded-full">
                <img src={reactImg} alt="avatar" className='w-full h-full object-cover rounded-full' />
              </div>
            <div>Đức Tài</div>
          </Popover>

          <div >

          </div>

        </div>
        <div className="grid grid-cols-12 gap-4 items-center py-6">
          <Link to="/" className='flex gap-3 items-center col-span-2'>
              <img src={logo} alt="" className='h-10 lg:h-12' />
              <span className="text-xl lg:text-2xl text-white">Shopee</span>
          </Link>
          <form className='col-span-9'>
            <div className="rounded-sm p-1 flex bg-white ">
              <input name='search' type="text" placeholder='Search something bro...' className='flex-grow px-3 py-2 text-black border-none outline-none bg-transparent'/>
              <button className='bg-[#f53d2d] py-2 px-6 hover:opacity-90 rounded-sm flex-shrink-0 text-white lg:px-10'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
          </form>
          <div className='col-span-1 text-white ml-auto mr-2'>
            <Link to="/" className='hover:text-gray-300 hover:cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg> 
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}