import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { createProduct } from '../api/productsApi';
import type { CreateProductInput } from '../types/product';

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (product: CreateProductInput) =>
            createProduct(product),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
            });
        },
    });
}
