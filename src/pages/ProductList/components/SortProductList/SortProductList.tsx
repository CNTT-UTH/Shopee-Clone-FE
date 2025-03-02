import { Dispatch, SetStateAction } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function Sort({setSortPrice}: {setSortPrice: Dispatch<SetStateAction<string>>}) {
  return <div className='bg-gray-300/40 py-4 px-3'>
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center flex-wrap gap-2">
        <div>Sắp xếp theo</div>
        <select 
          name="" 
          defaultValue='' 
          className='h-8 px-4 capitalize bg-white rounded-md cursor-pointer text-black text-sm hover:bg-slate-300 text-center'
          onChange={(e) => setSortPrice(e.target.value)}
        >
          <option value="" disabled>Giá: Mặc định</option>
          <option value="price:asc">Giá: Thấp đến Cao</option>
          <option value="price:des">Giá: Cao đến Thấp</option>
        </select>
      </div> 
    </div>
  </div>
}
