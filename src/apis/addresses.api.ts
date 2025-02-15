import { AddressAll } from "@uth/types/address.type"
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
  }
}

export default addressApi