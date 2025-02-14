export default interface Shipping {
  channel_id?: number;
  name?: string; // Ex: Nhanh, Hỏa tốc,...

  fee?: number;
  freeship?: boolean; // Miễn phí vận chuyển
  unsupport?: boolean; // Không hổ trợ

  estimated_delivery_days_min?: number; 
  estimated_delivery_days_max?: number; 

  estimated_delivery_date_from?: string; // timestamp
  estimated_delivery_date_to?: string; // timestamp
  delivery_text?: string; // Ex: Nhận từ 15 Th01 - 16 Th01

  is_fastest?: boolean;
}