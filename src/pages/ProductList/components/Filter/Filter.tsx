import path from '@uth/constants/path'
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { FaFilter } from "react-icons/fa";


export default function Filter() {
  return <div className="py-4">
    <Link to={path.home} className='flex items-center font-bold gap-4'>
      <AiOutlineMenuUnfold size={18}/>
      All Categories
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
      Search Filter
    </Link>
    <div className="bg-gray-300 h-[1px] my-4" /> 
    <div className="my-5">
      <div>Khoảng Giá</div>
      <form action="" className="mt-2">
        <div className="flex items-center">
          
        </div>
      </form>
    </div>
  </div>
}
