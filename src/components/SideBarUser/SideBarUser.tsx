import { Fragment } from "react/jsx-runtime";
import path from "../../constants/path";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

export default function SideBarUser() {
  return (
    <Fragment>
      <div className="flex items-center border-b border-b-gray-200 py-4">
        <Link to={path.profile} className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10">
          <img src="https://i.pinimg.com/736x/73/ae/14/73ae1424196238ffdeaf9dfc099fa88f.jpg" alt=""
            className="h-full w-full object-cover" 
          />
        </Link>
        <div className="flex-grow pl-4">
          <div className="mb-1 truncate text-gray-600 font-semibold">Duc Tai</div>
          <p className="text-xs">Welcome to profile</p>
        </div>
      </div>

      <div className='mt-7'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('flex items-center capitalize  transition-colors', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className='h-full w-full' />
          </div>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center capitalize transition-colors', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className='h-full w-full' />
          </div>
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to={path.infoPurchase}
          className={({ isActive }) =>
            classNames('mt-4 flex items-center  capitalize transition-colors', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078' alt='' className='h-full w-full' />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </Fragment>
  )
}
