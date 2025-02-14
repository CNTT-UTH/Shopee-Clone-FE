export interface CreateOption {
  name: string;
  value: string[];
}

export interface CreateOptionValue {
  name: string;
  value: string;
}

export interface CreateVariant {
  name: string;
  sku: string;
  option_values: CreateOptionValue[];
  price: Price;
  stock: number;
}

export interface ProductDimension {
  weight: number;
  height?: number;
  width?: number;
  length?: number;
}

export interface Attribute {
  id: number;
  name: string;
  value: string;
  brand_id?: string;
}

export interface Price {
  discount?: number;
  price: number;
  price_before_discount?: number;
  range_min?: number;
  range_max?: number;
  range_min_before_discount?: number;
  range_max_before_discount?: number;
}

export interface CreateProduct {
  sku: string;
  title: string;
  description: string;
  product_attributes: Attribute[];
  cate_id: number;
  options: CreateOption[];
  variants: CreateVariant[];
  price: number;
  stock: number;
  discount: number;
  image_urls: string[];
  shipping_channels: number[];
  dimension: ProductDimension;
}
