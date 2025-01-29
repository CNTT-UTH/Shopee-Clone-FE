import { Outlet } from "react-router-dom"
import SideBarUser from "../../components/SideBarUser"


export default function UserLayout() {
  return (
    <div className="py-16 bg-neutral-100 text-sm text-gray-600">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-3 lg:col-span-2">
            <SideBarUser />
          </div>
          
          <div className="md:col-span-9 lg:col-span-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
