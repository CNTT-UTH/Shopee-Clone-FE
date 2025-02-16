import { AddressSchema } from "./address.type";
import { User } from "./user.type";
import * as yup from "yup";

export interface ShopDTO {
    shopid?: string;
    account?: User;
    description?: string | null;
    name: string;
    item_count?: number;
    rating_star?: number; // số sao trung bình
    total_rating?: number; // tổng số lượt đánh giá
    response_rate?: number; // tỉ lệ phản hồi
    response_time?: number; // tốc độ phản hồi trung bình (tính bằng giây)
    follower_count?: number;
    created_at?: number; // timestamp
    default_address: string | null
}

  


// Schema cho RegisterInfoShopDTO
export const RegisterShopSchema = yup.object().shape({
  name: yup.string().required("Tên cửa hàng là bắt buộc"),
  phone: yup
    .string()
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})\b$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
  pickup_address: AddressSchema,  
});

export type RegisterShopSchemaType = yup.InferType<typeof RegisterShopSchema>
