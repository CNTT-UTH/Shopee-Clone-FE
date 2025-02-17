import path from '@uth/constants/path'
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { FaFilter } from "react-icons/fa";
import Input from '@uth/components/Input';
import Button from '@uth/components/Button';


export default function Filter() {
  return <div className="py-4">
    <Link to={path.home} className='flex items-center font-bold gap-4'>
      <AiOutlineMenuUnfold size={18}/>
      Tất cả Danh mục
    </Link>
    <div className="bg-gray-300 h-[1px] my-4" /> 
    <ul className='text-sm'>
      <li className="py-2 pl-2">
        <Link to={path.home} className='relative px-2 text-orange font-semibold'>Thời Trang Nam</Link>
      </li>
      <li className="py-2 pl-2">
        <Link to={path.home} className='relative px-2'>Áo Khoác</Link>
      </li>
      <li className="py-2 pl-2">
        <Link to={path.home} className='relative px-2'>Áo Vest và Blazer</Link>
      </li>
      <li className="py-2 pl-2">
        <Link to={path.home} className='relative px-2'>Quần Jeans</Link>
      </li>
      <li className="py-2 pl-2">
        <Link to={path.home} className='relative px-2'>Đồng Hồ</Link>
      </li>
    </ul>
    <Link to={path.home} className='mt-12 flex font-bold items-center gap-4'>
      <FaFilter />
      Bộ lọc tìm kiếm
    </Link>
    <div className="bg-gray-300 h-[1px] my-4" /> 
    <div className="my-5">
      <div>Khoảng Giá</div>
      <form action="" className="mt-2">
        <div className="flex items-start mt-4">
          <Input 
            type='text'
            name='from'
            className='grow'
            placeholder='₫ TỪ'
            classNameInput='text-sm outline-none border-2 rounded-md focus:border-gray-500 border-gray-300 w-full p-1 pl-3 focus:shadow-md' 
          />
          <div className="mx-2 mt-2 shrink-0">-</div>
          <Input 
            type='text'
            name='to'
            className='grow'
            placeholder='₫ ĐẾN'
            classNameInput='text-sm outline-none border-2 rounded-md focus:border-gray-500 border-gray-300 w-full p-1 pl-3 focus:shadow-md' 
          />
        </div>
        <Button className='w-full p-2 uppercase rounded-lg bg-orange text-white text-sm hover:opacity-70 flex justify-center items-center'>ÁP DỤNG</Button>
      </form>
    </div> 
  </div>
}
