import localforage from 'localforage';
import { Product } from '../types/Product';

const PRODUCTS_KEY = 'products';

export const getProducts = async (): Promise<Product[]> => {
  const products = await localforage.getItem<Product[]>(PRODUCTS_KEY);
  return products || [];
};

export const saveProduct = async (product: Product): Promise<void> => {
  const products = await getProducts();
  products.push(product);
  await localforage.setItem(PRODUCTS_KEY, products);
};

export const updateProduct = async (updatedProduct: Product): Promise<void> => {
  const products = await getProducts();
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = updatedProduct;
    await localforage.setItem(PRODUCTS_KEY, products);
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const products = await getProducts();
  const filteredProducts = products.filter(p => p.id !== productId);
  await localforage.setItem(PRODUCTS_KEY, filteredProducts);
};