import path from '@uth/constants/path'
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { createSearchParams, Link } from 'react-router-dom'
import { FaFilter } from "react-icons/fa";
import Input from '@uth/components/Input';
import Button from '@uth/components/Button';
import { Category } from '@uth/types/category.type';
import { QueryConfig } from '../../ProductList';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface Props {
  categories: Category[],
  queryConfig: QueryConfig
}


export default function Filter({categories, queryConfig}: Props ) {
  const {category} = queryConfig
  const [renderedCategories, setRenderedCategories] = useState<Category[]>([])

  useEffect(() => {
    setRenderedCategories(categories.slice(0,5))
  }, [categories])

  return <div className="py-4">
    <Link to={path.home} className='flex items-center font-bold gap-4'>
      <AiOutlineMenuUnfold size={18}/>
      Tất cả Danh mục
    </Link>
    <div className="bg-gray-300 h-[1px] my-4" /> 
    <ul className='text-sm'>
       {renderedCategories.map((item) => {
        const isActive = Number(item.cate_id) === Number(category)
        console.log(isActive, '>>>', queryConfig, item.cate_id, queryConfig.category)
        return (
          <li className='py-2 pl-2' key={item.cate_id}>
            <Link 
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  category: item.cate_id || ''
                }).toString()
              }}
              className={classNames('relative px-2', {
                'font-semibold text-orange': isActive
              })}
            >
              {isActive 
              &&  <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'>
                      <polygon points='4 3.5 0 0 0 7' />
                    </svg>}
              {item.name}
            </Link>
          </li>
        )
       })}
       <button className='ml-4 font-semibold' onClick={() => setRenderedCategories(categories)}>....</button>
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
