import { CartItem } from "./cart.type";

export class CheckoutTemp {
  orders?: OrderCheckout[];
  payment_method_id?: number;
  address_id!: number;
  total_products_price?: number;
  total_ship_fee?: number;
  total_price?: number;
}

export class OrderCheckout {
  order_temp_id?: string;
  shipping_info: any
  shipping_channel_id_selected!: number;
  notes?: string;
  items?: CartItem[];
  items_count?: number;
  shop_id!: number;
  ship_fee!: number;
  total_items_price?: number;
  estimated_delivery_date_from?: number; // timestamp
  estimated_delivery_date_to?: number; // timestamp

}
