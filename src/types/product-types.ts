export interface Store {
  store_id: number;
  store_name: string;
  city: string;
}

export interface Category {
  category_id: number;
  category_name: string;
  description?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category_id: string;
  store_id: string;
  initial_quantity: string;
}

export interface Product {
  product_id: number;
  store_id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  created_at?: string;
  updated_at?: string;
  category: Category;
  store: Store;
  Inventory?: {
    total_qty: number;
  }[];
  ProductImage?: {
    url: string;
  }[];
}