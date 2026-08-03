
import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { deleteProductById } from '../api/productsApi';

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            deleteProductById(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
            });
        },
    });
}
