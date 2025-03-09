import React from 'react'

export default function Loading() {
  return ( 
    <div role="status" className='absolute bg-white w-[100vw] flex items-start top-0 justify-center min-h-[75vh]'>
      <div className="w-full max-w-[75%] space-y-3 mt-10 ml-20">
        <div className='h-8 rounded-xl bg-gray-200 animate-pulse w-[70%] dark:bg-gray-700' />
        <div className='h-8 rounded-xl bg-gray-300 animate-pulse w-[75%] dark:bg-gray-700' />
        <div className='h-8 rounded-xl bg-gray-200 animate-pulse w-[80%] dark:bg-gray-700' />
        <div className='h-8 rounded-xl bg-gray-200 animate-pulse w-[90%] dark:bg-gray-700' />
        <div className='h-8 rounded-xl bg-gray-200 animate-pulse w-[100%] dark:bg-gray-700' />
        <div className='h-8 rounded-xl bg-gray-200 animate-pulse w-[100%] dark:bg-gray-700' />
        <div className='h-8 rounded-xl bg-gray-200 animate-pulse w-[90%] dark:bg-gray-700' />
        <div className='h-8 rounded-xl bg-gray-200 animate-pulse w-[85%] dark:bg-gray-700' />
        <div className='h-8 rounded-xl bg-gray-200 animate-pulse w-[95%] dark:bg-gray-700' />
        <div className='h-8 rounded-xl bg-gray-200 animate-pulse w-[85%] dark:bg-gray-700' />
        <div className='h-8 rounded-xl bg-gray-200 animate-pulse w-[85%] dark:bg-gray-700' />
        <div className='h-8 rounded-xl bg-gray-200 animate-pulse w-[75%] dark:bg-gray-700' />
        <div className='h-8 rounded-xl bg-gray-200 animate-pulse w-[75%] dark:bg-gray-700' />
        <div className='h-8 rounded-xl bg-gray-200 animate-pulse w-[85%] dark:bg-gray-700' />
      </div>
      <span className='sr-only'>Loading...</span>
    </div> 
  )
}
