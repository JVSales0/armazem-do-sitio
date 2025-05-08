
import { Product, getAllMockProducts } from "@/types/product";

// Simulate database with localStorage
const STORAGE_KEY = "armazem_products";

// Initialize localStorage with mock products if empty
const initializeProducts = (): void => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    // Use the mock products with their original image URLs
    const mockProducts = getAllMockProducts();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts));
  }
};

// Get all products
export const getAllProducts = (): Product[] => {
  initializeProducts();
  const productsJson = localStorage.getItem(STORAGE_KEY);
  return productsJson ? JSON.parse(productsJson) : [];
};

// Get product by ID
export const getProductById = (id: string): Product | undefined => {
  const products = getAllProducts();
  return products.find((p) => p.id === id);
};

// Add new product
export const addProduct = (product: Omit<Product, "id">): Product => {
  const products = getAllProducts();
  const newProduct = {
    ...product,
    id: `product-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  };
  
  products.push(newProduct);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  
  return newProduct;
};

// Update product
export const updateProduct = (product: Product): Product => {
  const products = getAllProducts();
  const index = products.findIndex((p) => p.id === product.id);
  
  if (index === -1) {
    throw new Error(`Product with ID ${product.id} not found`);
  }
  
  products[index] = product;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  
  return product;
};

// Delete product
export const deleteProduct = (id: string): void => {
  const products = getAllProducts();
  const updatedProducts = products.filter((p) => p.id !== id);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
};

// Search products
export const searchProducts = (query: string): Product[] => {
  const products = getAllProducts();
  query = query.toLowerCase();
  
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
  );
};

// Filter products by category
export const filterProductsByCategory = (category: string): Product[] => {
  const products = getAllProducts();
  
  if (category === "all") {
    return products;
  }
  
  return products.filter((p) => p.category === category);
};

// Reset products in localStorage (for testing purposes or to force reinitialization)
export const resetProductsData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  initializeProducts();
};
