import { Category, CategoryLevel } from "./category.type";
import Shipping from "./shipping";
import { ShopDTO } from "./shop.type";

export interface Product {
    product_id?: number;
    title?: string;
    description?: string;

    product_attributes?: Attribute[];

    cate_id?: number;
    cates?: Category[];
    cate_levels: CategoryLevel;

    review?: ProductReview;
    options?: Options[];
    variants?: Variant[];

    product_price: Price;

    shipping_from?: string;
    shipping_channel?: Shipping[];
    image_urls?: string[];
    shop: ShopDTO
    sku: string
    variants_mapping: Record<string, number>
}

export interface Attribute {
    id: string;
    name: string;
    value: string;
    brand_id?: string;
    // url?: string;
}

export interface ProductReview {
    cmt_count?: number;
    liked_count?: number;
    rating_count?: number[];
    rating_star?: number;
    global_sold?: number;
}

export interface Options {
    name?: string;
    value?: string[];
    image_urls?: string[];
    // sold_out?: boolean[];
}

export interface Variant {
    product_id?: number;
    variant_id?: number;
    sku?: string;
    name?: string;
    price?: number;
    price_before_discount?: number;
    sold?: number;
    stock?: number;  
}

export interface Price {
    discount?: number;
    price?: number;
    price_before_discount?: number;

    range_min?: number;
    range_max?: number;
    range_min_before_discount?: number;
    range_max_before_discount?: number;
}

export interface ProductParams {
  page: number | string;
  limit: number | string;
  category?: number | string;
  keyword?: string

  prev_page?: number | null | string;
  cur_page?: number | null | string;
  next_page?: number | null | string;
  total_page?: number | null | string;
} 


export interface IProduct {
  _id: number;
  title: string;
  sku: string
  description: string;
  specification: string
  category_id: number; // Foreign key to category
  quantity: number
  price: number;
  old_price: number;
  price_range_min: number
  price_range_max: number
  price_range_min_old: number
  price_range_max_old: number
  discount: number; // Optional discount price
  buyturn: string,
  weight: 710,
  width: number,
  height: number,
  length: number,
  created_at?: string,
  updated_at?: string,
  image: string
}


export interface IProductVariant {
  id: number;
  product_id: number; // Foreign key to product
  variant_name: string; // Name of the variant (e.g., "Red - Size M")
  price: number; // Variant-specific price
  discount_price?: number; // Discounted price (optional)
  stock: number; // Available stock for this variant
  sku?: string; // Stock Keeping Unit (optional)
  image?: string; // Image of the variant (optional)
  attributes?: Record<string, string>; // Example: { color: "Red", size: "M" }
  created_at: string;
  updated_at: string;
}


export interface IShop {
  id: number;
  name: string;
  description: string;
  phone: string;
  avatar: string;
  default_address_id: string;
  shop_location: string
  created_at: string;
  updated_at: string;
}
