export const productKeys = {
    all: ['products'] as const,

    details: (id: number) =>
        ['products', id] as const,

    bySupplier: (supplierId: number) =>
        ['products', 'supplier', supplierId] as const,
};
