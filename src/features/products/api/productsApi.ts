import type { Product, CreateProductInput } from '../types/product';

const API_BASE_URL = 'http://localhost:3000';

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const result = await response.json();

  if (Array.isArray(result)) {
    return result;
  }

  return result.data;
}

export async function createProduct(
  productInput: CreateProductInput,
): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productInput),
  });

  if (!response.ok) {
    throw new Error('Failed to create product');
  }

  return response.json();
}

export async function deleteProductById(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
}