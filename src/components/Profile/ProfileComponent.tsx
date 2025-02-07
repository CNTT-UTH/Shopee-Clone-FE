import { useQuery } from "@tanstack/react-query"
import userApi from "@uth/apis/user.api"
import Input from "@uth/components/Input"
import Button from "@uth/components/Button"
import formatEmail from "@uth/utils/formatEmail"

export default function ProfileComponent() {

  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.result

  console.log(profile)

  return (
    <div className="bg-white rounded-md px-2 md:px-7 pb-10 md:pb-20 shadow">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">My Profile</h1>
        <div className="mt-1 text-sm text-gray-700">
          Manage and protect your account
        </div>
      </div>
      <form className="mt-8 flex flex-col-reverse md:flex-row md:items-start">
        <div className="mt-6 flex-grow pr-12 md:mt-0">
          <div className="flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">Username</div>
            <div className="sm:w-[80%] sm:pl-5">
              <div className="pt-3 text-gray-700">DucTaiPhan</div>
            </div>
          </div>
          <div className="flex flex-wrap mt-4 flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">Email</div>
            <div className="sm:w-[80%] sm:pl-5">
              <div className="pt-3 text-gray-700">{formatEmail('ductai@gmail.com')}</div>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">Name</div>
            <div className="sm:w-[80%] sm:pl-5">
              <input className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-gray-500 focus:shadow-sm"/>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">Phone number</div>
            <div className="sm:w-[80%] sm:pl-5">
              <input className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-gray-500 focus:shadow-sm"/>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">BirthDay</div>
            <div className="sm:w-[80%] sm:pl-5">
              <div className="flex justify-between">
                <select className="h-10 w-[32%] rounded-sm border border-black/10 px-3">
                  <option disabled>Day</option>
                </select>
                <select className="h-10 w-[32%] rounded-sm border border-black/10 px-3">
                  <option disabled>Month</option>
                </select>
                <select className="h-10 w-[32%] rounded-sm border border-black/10 px-3">
                  <option disabled>Year</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 flex-col sm:flex-row">
            <div className="sm:w-[20%] sm:mr-5 pt-3"></div>
            <Button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center mt-4">Save</Button>
          </div>
        </div>
        <div className="flex justify-center md:w-72 md:border-l md:border-l-gray-200">
          <div className="flex flex-col items-center">
            <div className="my-5 h-24 w-24">
              <img 
                src="https://i.pinimg.com/736x/cf/d4/de/cfd4deea360693aea33bcc2afc7655b4.jpg" alt=""
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <input className="hidden" type="file" accept=".jpg, .jpeg, .png" id="" />
            <button className="h-10 flex items-center justify-end rounded-md border bg-white px-6 text-sm text-gray-600 shadow-sm">
              Select Image
            </button>
            <div className="text-gray-400 mt-3">
              <p>File size: maximum 1 MB</p>
              <p>File extension: .JPEG, .PNG</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
