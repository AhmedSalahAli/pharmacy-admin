import { useQuery } from '@tanstack/react-query';

import { productsApi } from '../api/productsApi';
import { productKeys } from '../kyes/products.keys';

export function useProducts() {
    const query = useQuery({
        queryKey: productKeys.all,
        queryFn: productsApi.getAll,

        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes

        select: (products) => ({
            products,
            totalProducts: products.length,
            totalQuantity: products.reduce(
                (sum, product) => sum + product.quantity,
                0,
            ),
            inventoryValue: products.reduce(
                (sum, product) =>
                    sum + product.price * product.quantity,
                0,
            ),
        }),
    });

    return {
        products: query.data?.products ?? [],
        totalProducts: query.data?.totalProducts ?? 0,
        totalQuantity: query.data?.totalQuantity ?? 0,
        inventoryValue: query.data?.inventoryValue ?? 0,

        isLoading: query.isLoading,
        isError: query.isError,
    };
}
