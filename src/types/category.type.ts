export interface Category {
  cate_id?: string;          
  name?: string;            
  level?: number;         
  children?: Category[];    
  parent_id?: string;         
  image_url?: string;        
}

export class CategoryLevel {
  [level: number]: Category;
}
