import React from 'react'
import ShopeeLogo from '@uth/assets/images/logo_auth.svg'
import { useAuth } from '@uth/contexts/auth.context'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'

export default function HeaderRegisterShop() {
  const {user} = useAuth()
  return (
    <div className='container mb-20'>
      <div className="max-w-screen-xl mx-10 flex justify-between items-center p-4 mb-6 border-b pb-4">
        <Link to="/"><img src={ShopeeLogo} alt="Shopee Logo" className="h-14" /></Link>
          <div className='flex items-center gap-1'>
            <div className="mx-2 w-6 h-6 bg-white flex-shrink-0 rounded-full cursor-pointer">
              {user?.avatar 
              ? <img src={user?.avatar} alt="avatar"
                className="h-full w-full rounded-full object-cover" 
                />
              : <Avatar name={user?.username || 'user'} size="24" className='h-full w-full rounded-full object-cover' round={true}/>}              
            </div>
            <div>{user?.username}</div>
          </div>
      </div>
    </div>
  )
}
