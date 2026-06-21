import type { Product, CreateProductInput } from '../types/product';

const API_BASE_URL = 'http://localhost:3000';

async function handleError(response: Response) {
    const errorBody = await response.json().catch(() => null);

    console.error('API Error:', {
        status: response.status,
        body: errorBody,
    });

    throw new Error(
        errorBody?.message
            ? JSON.stringify(errorBody.message)
            : 'API request failed',
    );
}

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
        await handleError(response);
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
        await handleError(response);
    }

    return response.json();
}

export async function deleteProductById(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        await handleError(response);
    }
}