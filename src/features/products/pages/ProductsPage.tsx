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

import '../products.css';

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
    <div className="products-page">
      <div className="products-page-header">
        <div>
          <h1 className="products-page-title">Products</h1>
          <p className="products-page-subtitle">
            Manage pharmacy products, prices, stock, and suppliers.
          </p>
        </div>
      </div>

      {errorMessage && (
        <p className="products-message-error">{errorMessage}</p>
      )}

      {isError && (
        <p className="products-message-error">Failed to load products</p>
      )}

      <div className="products-stats-grid">
        <div className="products-stat-card">
          <p className="products-stat-label">Total products</p>
          <p className="products-stat-value">{totalProducts}</p>
        </div>

        <div className="products-stat-card">
          <p className="products-stat-label">Total quantity</p>
          <p className="products-stat-value">{totalQuantity}</p>
        </div>

        <div className="products-stat-card">
          <p className="products-stat-label">Inventory value</p>
          <p className="products-stat-value">
            {totalInventoryValue} EGP
          </p>
        </div>
      </div>

      <section className="products-section">
        <CreateProductForm
          onAddProduct={saveProduct}
          isSubmitting={
            createProductMutation.isPending ||
            updateProductMutation.isPending
          }
          editingProduct={editingProduct}
          onCancelEdit={() => setEditingProduct(null)}
        />
      </section>

      <section className="products-section">
        <h2 className="products-section-title">Products List</h2>

        {isLoading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="products-list">
            {products.map((product) => (
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
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductsPage;