import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { productsApi } from '../api/productsApi';
import { productKeys } from '../kyes/products.keys';
import type { CreateProductInput } from '../types/product';

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (product: CreateProductInput) =>
            productsApi.create(product),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: productKeys.all,
            });
        },
    });
}
