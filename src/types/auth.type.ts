import { User } from "./user.type";
import { ResponseApi } from "./utils.type";

export type AuthResponse = ResponseApi<{
  accessToken: string
  refreshToken: string
  expires_access_token : string
  expires_refresh_token : string
  user : User
}> // => { result: { access_token, refresh_token, ,expires , user}, message: string }  

//test typescript recommendation
// const auth : AuthResponse = {
//   message: 'Success....',
//   result: {
//     access_token: 'test',
//     ...
//   }
// }