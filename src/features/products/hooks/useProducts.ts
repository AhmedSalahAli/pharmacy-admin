import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/productsApi';

export function useProducts() {
    const query = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    return {
        products: query.data ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
        refetch: query.refetch,
    };
}
