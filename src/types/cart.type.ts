import { IProduct, IProductVariant, IShop } from "./product.type"

export interface Cart {
  items?: CartItem[]

  total?: number
  total_before_discount?: number
  shops?: number[]
}

export interface CartItem {
  id?: number
  product_id?: number
  product_variant_id?: number
  variant_id?: number
  shop_id: number
  block_id?: number
  quantity?: number
  selected_to_checkout?: number
  price?: number
  price_before_discount?: number
  total_price?: number
  product_name?: string
  image?: string
  shop_name?: string
  shop_avatar?: string
}

export interface UpdateQuantity {
  item_id: number

  quantity: number
}

export interface CartRes {
  id: number;
  user_id: number; // Assuming user_id is needed instead of full User entity
  total: number;
  total_before_discount: number;
  cart_items: CartItemRes[]; // Array of CartItems
  created_at: string;
  updated_at: string;
}

export interface CartItemRes {
  id: number;
  block_id: number;
  cart_id: number;
  product_id?: number; // Optional if product is nullable
  product_variant_id?: number;
  shop_id?: number;
  quantity: number;
  selected_to_checkout: boolean;
  created_at: string;
  updated_at: string;
  product?: IProduct; // Optional if you need full product details
  product_variant?: IProductVariant;
  shop?: IShop;
}
