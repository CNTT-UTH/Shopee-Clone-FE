import { AddressAll, addressSchemaType } from "@uth/types/address.type"
import { ResponseApi } from "@uth/types/utils.type"
import http from "@uth/utils/axios.http"

const URL_ADDRESS = "/addresses"

const addressApi = {
  /**
   * Get all addresses.
   * @returns A promise resolving to the registration response data.
   */
  getAllCities () {
    return http
      .get<AddressAll>(`${URL_ADDRESS}/get-all-cities`)
      .then(res => res.data)
      .catch((error) => {
        console.error('Get all cities failed', error)
        throw error
      })
  }, 

  /**
   * Get all districts by city code.
   * @param cityCode The code of the city.
   * @returns A promise resolving to the registration response data.
   */
  getAllDistricts(cityCode: number) {
    return http
      .get<AddressAll>(`${URL_ADDRESS}/get-all-districts/${cityCode}`)
      .then((res) => res.data)
      .catch((error) => {
        console.error("Get all districts failed", error)
        throw error
      })
  },

  /**
   * Get all wards by district code.
   * @param districtCode The code of the district.
   * @returns A promise resolving to the registration response data.
   */
  getAllWards(districtCode: number) {
    return http
      .get<AddressAll>(`${URL_ADDRESS}/get-all-wards/${districtCode}`)
      .then((res) => res.data)
      .catch((error) => {
        console.error("Get all wards failed", error)
        throw error
      })
  },

  getMyAddress() {
    return http
      .get<ResponseApi<addressSchemaType[]>>(`${URL_ADDRESS}/get-user-addresses`)
      .then((res) => res.data)
      .catch((error) => {
        console.error("Get my address failed", error)
        throw error
      })
  },

  createNewAddress(body: addressSchemaType) {
    return http
    .post<ResponseApi<addressSchemaType>>(`${URL_ADDRESS}/create-user-address`)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Create my address failed", error)
      throw error
    })
  }
}

export default addressApi