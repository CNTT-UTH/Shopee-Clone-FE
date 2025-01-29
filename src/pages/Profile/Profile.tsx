import { useQuery } from "@tanstack/react-query"
import userApi from "../../apis/user.api"
import Input from "../../components/Input"

export default function Profile() {

  function formatEmail( email : string) : string {
    const [username, domain] = email.split("@")
    if (username.length <= 2) {
      return username[0] + "*" + "@" + domain
    }
    const formattedUsername = username[0] + "*".repeat(username.length - 2) + username[username.length - 1];
    return `${formattedUsername}@${domain}`
  }

  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.result

  console.log(profile)
  return (
    <div className="bg-white rounded-md px-7 pb-20 shadow">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">My Profile</h1>
        <div className="mt-1 text-sm text-gray-700">
          Manage and protect your account
        </div>
      </div>
      <div className="mt-8 flex flex-col-reverse md:flex-row md:items-start">
        <form className="mt-6 flex-grow pr-12 md:mt-0">
          <div className="flex">
            <div className="w-[20%] truncate pt-3 text-right capitalize">Username</div>
            <div className="w-[80%] pl-5">
              <div className="pt-3 text-gray-700">DucTaiPhan</div>
            </div>
          </div>
          <div className="flex mt-4">
            <div className="w-[20%] truncate pt-3 text-right capitalize">Email</div>
            <div className="w-[80%] pl-5">
              <div className="pt-3 text-gray-700">{formatEmail('ductai@gmail.com')}</div>
            </div>
          </div>
          <div className="flex mt-6">
            <div className="w-[20%] truncate pt-3 text-right capitalize">Name</div>
            <div className="w-[80%] pl-5">
              <input className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-gray-500 focus:shadow-sm"/>
            </div>
          </div>
          <div className="flex mt-6">
            <div className="w-[20%] truncate pt-3 text-right capitalize">Phone number</div>
            <div className="w-[80%] pl-5">
              <input className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-gray-500 focus:shadow-sm"/>
            </div>
          </div>
          <div className="mt-6 flex">
            <div className="w-[20%] truncate pt-3 text-right capitalize">BirthDay</div>
            <div className="w-[80%] pl-5">
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
        </form>
      </div>
    </div>
  )
}
