import { User } from "./user.type";
import { ResponseApi } from "./utils.type";

export type AuthResponse = ResponseApi<{
  access_token: string
  refresh_token: string
  expires_access_token? : string
  expires_refresh_token? : string
  user_profile : User
}> // => { result: { access_token, refresh_token, ,expires , user}, message: string }  

//test typescript recommendation
// const auth : AuthResponse = {
//   message: 'Success....',
//   result: {
//     access_token: 'test',
//     ...
//   }
// }

export type RegisterResponse = ResponseApi<{
  verify_mail_token: string
}>

export type RefreshTokenResponse = ResponseApi<{
  access_token: string
  refresh_token: string
}>