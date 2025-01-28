import { Outlet } from "react-router-dom"
import SideBarUser from "../../components/SideBarUser"


export default function UserLayout() {
  return (
    <div>
      <SideBarUser />
      <Outlet />
    </div>
  )
}
