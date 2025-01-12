import { Category } from "./category.type";

export interface Product {
    product_id?: string;
    title?: string;
    description?: string;

    product_attributes?: Attribute[];

    cat_id?: string;
    cates?: Category[];

    review?: ProductReview;
    options?: Options[];
    variants?: variant[];

    product_price?: Price[];

    shipping_from?: string;
    shipping_channel?: Shipping[];
}

export interface Attribute {
    id?: string;
    name?: string;
    value?: string;
    brand_id?: string;
    url?: string;
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
    sold_out?: boolean[];
}

export interface variant {
    product_id?: string;
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

export interface Shipping {
    channel_id?: number;
    name?: number; // Ex: Nhanh, Hỏa tốc,...

    fee?: number;
    freeship?: boolean; // Miễn phí vận chuyển
    unsupport?: boolean; // Không hổ trợ

    estimated_delivery_date_from?: string; // timestamp
    estimated_delivery_date_to?: string; // timestamp
    delivery_text?: string; // Ex: Nhận từ 15 Th01 - 16 Th01

    is_fastest?: boolean;
}