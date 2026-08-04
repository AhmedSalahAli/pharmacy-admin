import { api } from '@shared/api/http';

import type {
    CreateProductInput,
    Product,
    UpdateProductInput,
} from '../types/product';

export const productsApi = {
    async getAll(): Promise<Product[]> {
        const response = await api.get('/products');

        const result = response.data;

        if (Array.isArray(result)) {
            return result;
        }

        return result.data;
    },

    async create(
        productInput: CreateProductInput,
    ): Promise<Product> {
        const response = await api.post(
            '/products',
            productInput,
        );

        return response.data;
    },

    async update(
        id: number,
        productInput: UpdateProductInput,
    ): Promise<Product> {
        const response = await api.patch(
            `/products/${id}`,
            productInput,
        );

        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/products/${id}`);
    },
};
