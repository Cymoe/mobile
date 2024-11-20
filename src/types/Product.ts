export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  sku?: string;
  unit?: string;
  inStock?: number;
  category?: string;
}