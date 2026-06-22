import { useState } from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import ProductCard from '../components/ProductCard';
import CreateProductForm from '../components/CreateProductForm';

import type {
  Product,
  CreateProductInput,
  UpdateProductInput,
} from '../types/product';

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProductById,
} from '../api/productsApi';

function ProductsPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const queryClient = useQueryClient();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: () => {
      setErrorMessage('Failed to create product');
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({
      id,
      productInput,
    }: {
      id: number;
      productInput: UpdateProductInput;
    }) => updateProduct(id, productInput),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });

      setEditingProduct(null);
    },

    onError: () => {
      setErrorMessage('Failed to update product');
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProductById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: () => {
      setErrorMessage('Failed to delete product');
    },
  });

  function saveProduct(productInput: CreateProductInput) {
    setErrorMessage('');

    if (editingProduct) {
      updateProductMutation.mutate({
        id: editingProduct.id,
        productInput,
      });

      return;
    }

    createProductMutation.mutate(productInput);
  }

  function startEditingProduct(id: number) {
    const selectedProduct = products.find((product) => product.id === id);

    if (!selectedProduct) {
      return;
    }

    setEditingProduct(selectedProduct);
  }

  function deleteProduct(id: number) {
    setErrorMessage('');
    deleteProductMutation.mutate(id);
  }

  const totalProducts = products.length;

  const totalQuantity = products.reduce((sum, product) => {
    return sum + product.quantity;
  }, 0);

  const totalInventoryValue = products.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  return (
    <div>
      <h2>Products</h2>

      {errorMessage && <p>{errorMessage}</p>}
      {isError && <p>Failed to load products</p>}

      <div>
        <p>Total products: {totalProducts}</p>
        <p>Total quantity: {totalQuantity}</p>
        <p>Total inventory value: {totalInventoryValue} EGP</p>
      </div>

      <CreateProductForm
        onAddProduct={saveProduct}
        isSubmitting={
          createProductMutation.isPending ||
          updateProductMutation.isPending
        }
        editingProduct={editingProduct}
        onCancelEdit={() => setEditingProduct(null)}
      />

      <hr />

      <h3>Products List</h3>

      {isLoading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            barcode={product.barcode}
            price={product.price}
            quantity={product.quantity}
            supplierName={product.supplier?.name}
            isAvailable={product.isAvailable}
            onEdit={startEditingProduct}
            onDelete={deleteProduct}
          />
        ))
      )}
    </div>
  );
}

export default ProductsPage;