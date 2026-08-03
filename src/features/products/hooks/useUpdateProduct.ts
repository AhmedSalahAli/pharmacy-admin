import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { updateProduct } from '../api/productsApi';

import type {
    UpdateProductInput,
} from '../types/product';

type UpdateProductVariables = {
    id: number;
    productInput: UpdateProductInput;
};

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            productInput,
        }: UpdateProductVariables) =>
            updateProduct(id, productInput),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
            });
        },
    });
}
