
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { productsApi } from '../api/productsApi';
import { productKeys } from '../kyes/products.keys';

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            productsApi.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: productKeys.all,
            });
        },
    });
}
