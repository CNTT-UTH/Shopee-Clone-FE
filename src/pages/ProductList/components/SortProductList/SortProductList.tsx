import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function Sort() {
  return <div className='bg-gray-300/40 py-4 px-3'>
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center flex-wrap gap-2">
        <div>Sắp xếp theo</div>
        <select name="" className='h-8 px-4 capitalize bg-white rounded-md cursor-pointer text-black text-sm hover:bg-slate-300 text-center'>
          <option value="" disabled>Giá</option>
          <option value="price:asc">Giá: Thấp đến Cao</option>
          <option value="price:des">Giá: Cao đến Thấp</option>
        </select>
      </div>
      <div className="flex items-center">
        <div>
          <span className="text-orange">1</span>
          <span>/9</span>
        </div>
        <div className="ml-2 flex">
          <button className="px-3 h-8 pr-1 rounded-tl-md rounded-bl-md bg-white/60 hover:bg-slate-100 cursor-not-allowed">
            <GrFormPrevious />
          </button>
          <div className="w-[1px] bg-gray-200"></div>
          <button className="px-3 h-8 pl-1 rounded-tr-md rounded-br-md bg-white/60 hover:bg-slate-100">
            <GrFormNext />
          </button>
        </div>
      </div>
    </div>
  </div>
}
