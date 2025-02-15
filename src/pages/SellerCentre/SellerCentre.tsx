import Dashboard from '@uth/components/DashBoard'
import SidebarSeller from '@uth/components/SideBarSeller'
import React from 'react'

export default function SellerCentre() {
  return <div className='grid grid-cols-4 container max-w-screen-xl justify-between'>
    <div className='col-span-1 p-4'>
      <SidebarSeller />
    </div>
    <div className='col-span-3 p-4'>
      <Dashboard />
    </div>
  </div>
}
