import { ResponseApi } from "./utils.type";
import * as yup from 'yup'
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

 
export const AddressSchema = yup.object().shape({
  city: yup.string().required("Vui lòng chọn thành phố"),
  district: yup.string().required("Vui lòng chọn quận/huyện"),
  ward: yup.string().required("Vui lòng chọn phường/xã"),
  address_line: yup.string().required("Vui lòng nhập địa chỉ cụ thể"),
  phone_number: yup
    .string()
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})\b$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
});

export type addressSchemaType = yup.InferType<typeof AddressSchema>
export type AddressAll = ResponseApi<infoAddress[]>