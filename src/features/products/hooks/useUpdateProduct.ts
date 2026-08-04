import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { productsApi } from '../api/productsApi';
import { productKeys } from '../kyes/products.keys';
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
            productsApi.update(id, productInput),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: productKeys.all,
            });
        },
    });
}
