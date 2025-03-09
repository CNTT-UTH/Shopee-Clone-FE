
import { createSearchParams, Link } from 'react-router-dom'
import reactImg from '../../assets/react.svg'
import logo from '../../assets/images/logo.svg' 
import Popover from '../Popover'
import { useAuth } from '../../contexts/auth.context'
import path from '../../constants/path'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { toast } from 'react-toastify' 
import Avatar from 'react-avatar'
import { useCart } from '@uth/queries/useCart'
import { queryClient } from '@uth/main'
import Input from '../Input'
import { QueryConfig } from '@uth/pages/ProductList/ProductList'
import { useEffect, useRef, useState } from 'react'

export default function Header() {
  const { setIsAuthenticated, isAuthenticated, user, setUser } = useAuth()
  const [searchValue, setSearchValue] = useState('Quần') 
  const inputRef = useRef<HTMLAnchorElement>(null)
  const { i18n, t } = useTranslation(['auth', 'global'])
  const queryConfig: QueryConfig = {
      page: '1',
      limit: '12',
      keyword: searchValue
  } 

  const changeLanguage = (lng: 'vi' | 'en') => {
    i18n.changeLanguage(lng) 
  }

  const logoutMutation = useMutation({
    mutationFn: authApi.logoutAuth
  })

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Logout success')
        setIsAuthenticated(false)
        setUser(null)
        queryClient.removeQueries({queryKey: ['cart']})
      },
      onError: () => console.log('Error logout')
    })
  }

  //when changing the page, the header is just re-render, not unmount - mounting again
  const {data, isLoading} = useCart()
  const cartData = data?.result?.items
  

  const infoPopover = (
      <div className="flex flex-col py-1 px-1">
        <button onClick={() => changeLanguage('en')} className='hover:bg-gray-50 hover:text-orange py-3 px-3 rounded-md'>English</button>
        <button onClick={() => changeLanguage('vi')} className='hover:bg-gray-50 hover:text-orange py-3 px-3 rounded-md'>Tieng Viet</button>
  </div>)

  const avatarPopover = (<div className='px-1 py-1'>
    <Link to={path.profile} className='block py-2 px-3 hover:bg-gray-50 hover:text-cyan-500 rounded-md'>My Account</Link>
    <Link to='/' className='block py-2 px-3 hover:bg-gray-50 hover:text-cyan-500 rounded-md'>Order</Link>
    <button onClick={handleLogout} className='block w-full text-left py-2 px-3 hover:bg-gray-50 hover:text-cyan-500 rounded-md'>Log Out</button>
  </div>)

  const cartPopover = (
    !cartData?.length
    ? <div className='p-14 px-16 z-100 bg-gray-100'>
        <img className='w-[100px] h-[100px] rounded-full m-auto object-cover' src="https://mir-s3-cdn-cf.behance.net/projects/404/54b13147340145.Y3JvcCw0MDUsMzE3LDAsNDI.png" alt="" />
        <p className='mt-4 text-orange font-semibold'>The cart is empty</p>
      </div>
    : <div className='text-sm z-100 p-4 max-w-[400px] border-gray-200 border'>
    <p className='text-gray-400 capitalize'>Added new product</p>
    <div className='mt-5'>
      {cartData.slice(0, 4).map((item, index) => (
      <div className="mt-4 flex gap-1" key={index}>
        <img className='object-cover w-28 h-20 flex-shrink-0 rounded-md' src={item?.image} alt="" />
        <div className='flex-grow ml-2 overflow-hidden'>
          <div className="truncate">
            {item?.product_name}     
          </div>
          <div className="text-orange mt-2">₫{item?.price?.toLocaleString('VN')}</div>
        </div>
      </div> 
      ))}
    </div>

    <div className="flex mt-2 items-center justify-between text-white ">
      <div className="text-black text-opacity-70">{cartData.length} Products In Cart</div>
      <Link to={path.cart} className="bg-orange p-2 rounded-md hover:bg-opacity-80">View My Shopping Cart</Link>
    </div>
    </div>
  )

  return (
    <div className="pb-4 bg-gradient-to-b from-[#d0011b] to-[#f53d2d]">
      <div className="container">
        <div className="flex justify-end text-white text-sm py-2">
          <div className='flex items-center mr-auto'>
            <Link to={path.sellerCentre} className='mx-3 text-md capitalize text-white hover:text-white/70 cursor-pointer'>
              Seller Centre
            </Link>
          </div>
          <Popover 
            infoPopover={infoPopover}
            className={"flex items-center h-16 hover:text-gray-300 cursor-pointer"}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg> 
            <span className="mx-1">{t('global:Language')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </Popover>  

          {isAuthenticated 
          ? <Popover 
            infoPopover={avatarPopover}
            className={"flex items-center hover:text-gray-300 cursor-pointer ml-4"}
            >
              <div className="mx-2  bg-white flex-shrink-0 rounded-full cursor-pointer">
                {user?.avatar 
                ? <img src={user?.avatar} alt="avatar"
                  className="max-w-8 max-h-8 rounded-full object-cover" 
                  />
                : <Avatar name={user?.username || 'user'} size="24" className='max-h-8 max-w-8 rounded-full object-cover' round={true}/>}              
                </div>
                <div>{user?.username}</div>
            </Popover> : 
            (<div className='flex items-center'>
              <Link to={path.register} className='mx-3 capitalize hover:text-white/70 cursor-pointer'>
                Register
              </Link>
              <div> | </div>
              <Link to={path.login} className='mx-3 capitalize hover:text-white/70 cursor-pointer'>
                Login
              </Link>
            </div>)}

          <div >

          </div>

        </div>
        <div className="grid grid-cols-12 gap-4 items-center pt-2 pb-6">
          <Link to={path.home} className='flex gap-3 items-center col-span-2'>
              <img src={logo} alt="" className='h-10 lg:h-12' />
              <span className="text-xl lg:text-2xl text-white">Shopee</span>
          </Link>
          <div className='col-span-9'>
            <div className="rounded-lg p-1 flex gap-4 bg-white ">
              <Input 
                onChange={(e) => setSearchValue(e.target.value)} 
                name="search" className='flex-grow p-2 px-4' 
                classNameInput='w-full px-2 text-black text-lg outline-none bg-transparent' 
                classNameError='none' placeholder='Search the product that you want to find'
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    inputRef.current?.click()
                  }
                }}
              />
              <Link 
                to={{
                  pathname: path.search,
                  search: createSearchParams({
                    ...queryConfig,
                    keyword: searchValue.trim()
                  }).toString()
                }}   
                ref={inputRef}
                className='bg-[#f53d2d] px-6 hover:opacity-90 flex items-center justify-center rounded-lg flex-shrink-0 text-white lg:px-10'
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </Link>
            </div>
          </div>

          <div className='col-span-1 text-white ml-auto mr-2'>
            <Popover infoPopover={cartPopover}>
              <Link to={path.cart} className='relative hover:text-gray-300 hover:cursor-pointer py-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="size-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg> 
                {cartData?.length ? <div className='bg-white absolute px-2 py-[1px] rounded-full -right-2 text-orange top-0'>{cartData?.length}</div> : ''}
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}