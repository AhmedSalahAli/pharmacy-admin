import { api } from '@shared/api/http';

import type {
    CreateProductInput,
    Product,
    UpdateProductInput,
} from '../types/product';

export async function getProducts(): Promise<Product[]> {
    const response = await api.get('/products');

    const result = response.data;

    if (Array.isArray(result)) {
        return result;
    }

    return result.data;
}

export async function createProduct(
    productInput: CreateProductInput,
): Promise<Product> {
    const response = await api.post('/products', productInput);

    return response.data;
}

export async function deleteProductById(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
}

export async function updateProduct(
    id: number,
    productInput: UpdateProductInput,
): Promise<Product> {
    const response = await api.patch(
        `/products/${id}`,
        productInput,
    );

    return response.data;
}
