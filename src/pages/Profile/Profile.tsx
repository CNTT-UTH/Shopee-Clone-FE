import { useQuery } from "@tanstack/react-query"
import userApi from "../../apis/user.api"

export default function Profile() {

  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.result

  console.log(profile)
  return (
    <div>
      Profile page
    </div>
  )
}
