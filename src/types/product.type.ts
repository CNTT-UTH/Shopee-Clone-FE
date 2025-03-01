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
    rating_count?: number[]; // [0]: tổng rating, 1->5 tổng ratings với số sao tương ứng
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
    stock?: number; //số lượng tồn kho
}

export interface Price {
    discount?: number;
    price?: number;
    price_before_discount?: number;

    /* đối với sản phẩm có nhiều biến thể */
    range_min?: number;
    range_max?: number;
    range_min_before_discount?: number;
    range_max_before_discount?: number;
}

export interface ProductParams {
  page: number;
  limit: number;

  prev_page?: number | null;
  cur_page?: number | null;
  next_page?: number | null;
  total_page?: number | null;
}