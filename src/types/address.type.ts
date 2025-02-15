import { ResponseApi } from "./utils.type";

export interface Address {
  city?: string;
  district?: string;
  ward?: string;
  address_line?: string;
  phone_number?: string;
}

interface infoAddress {
  code: string
  full_name: string
}

export type AddressAll = ResponseApi<infoAddress[]>