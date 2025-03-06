export interface Cart {
  username?: string
  items?: CartItem[]

  total?: number
  total_before_discount?: number
}

export interface CartItem {
  product_id: number
  shop_id: number
  quantity: number;

  //________optional_________
  product_variant_id?: number
  block_id?: number;
  selected_to_checkout?: false;
}

export interface UpdateQuantity {
  item_id: number

  quantity: number
}