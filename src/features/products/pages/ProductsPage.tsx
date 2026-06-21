import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import CreateProductForm from '../components/CreateProductForm';
import type { Product, CreateProductInput } from '../types/product';
import {
  getProducts,
  createProduct,
  deleteProductById,
} from '../api/productsApi';

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const productsResponse = await getProducts();

        setProducts(productsResponse);
      } catch (error) {
        setErrorMessage('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  async function addProduct(productInput: CreateProductInput) {
    try {
      setIsCreating(true);
      setErrorMessage('');

      const newProduct = await createProduct(productInput);

      setProducts([...products, newProduct]);
    } catch (error) {
      setErrorMessage('Failed to create product');
    } finally {
      setIsCreating(false);
    }
  }

  async function deleteProduct(id: number) {
    try {
      setErrorMessage('');

      await deleteProductById(id);

      const filteredProducts = products.filter((product) => product.id !== id);

      setProducts(filteredProducts);
    } catch (error) {
      setErrorMessage('Failed to delete product');
    }
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

      <div>
        <p>Total products: {totalProducts}</p>
        <p>Total quantity: {totalQuantity}</p>
        <p>Total inventory value: {totalInventoryValue} EGP</p>
      </div>

      <CreateProductForm
        onAddProduct={addProduct}
        isSubmitting={isCreating}
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
            onDelete={deleteProduct}
          />
        ))
      )}
    </div>
  );
}

export default ProductsPage;