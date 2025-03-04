import { useProductDetail } from '@uth/queries/useProduct'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams } from 'react-router-dom'

export default function ProductDetail() {
  const {id} = useParams()

  const {data} = useProductDetail(id as string)
  const productData = data?.result
  if(!productData) return

  return (
    <div className='bg-gray-200 py-6'>
      <div className="bg-white p-4 shadow">
        <div className="container"> 
          <div className="grid grid-cols-12 gap-9">
            <div className="col-span-5">
              <div className="relative w-full pt-[100%] shadow">
                <img 
                  src={productData.image_urls?.[0]}
                  alt={productData.title}
                  className='absolute top-0 bg-white w-full h-full object-cover rounded-lg'
                />
              </div>
              <div className="relative mt-4 grid grid-cols-5 gap-1">
                <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <FaChevronLeft />
                </button>
                {productData.image_urls?.slice(0, 5).map((image, index) => {
                  const isActive = index === 0
                  return (
                    <div key={index} className='relative w-full pt-[100%]'>
                      <img 
                        src={image} 
                        className='absolute top-0 cursor-pointer bg-white w-full h-full object-cover rounded-lg'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                    </div>
                  )
                })}
                <button className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <FaChevronRight />
                </button>
              </div>
            </div>
            <div className="col-span-7">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
