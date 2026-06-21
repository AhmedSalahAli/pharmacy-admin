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

  useEffect(() => {
    async function loadProducts() {
      const productsResponse = await getProducts();

      setProducts(productsResponse);
      setIsLoading(false);
    }

    loadProducts();
  }, []);

  async function addProduct(productInput: CreateProductInput) {
    const newProduct = await createProduct(productInput);

    setProducts([...products, newProduct]);
  }

  async function deleteProduct(id: number) {
    await deleteProductById(id);

    const filteredProducts = products.filter((product) => product.id !== id);

    setProducts(filteredProducts);
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

      <div>
        <p>Total products: {totalProducts}</p>
        <p>Total quantity: {totalQuantity}</p>
        <p>Total inventory value: {totalInventoryValue} EGP</p>
      </div>

      <CreateProductForm onAddProduct={addProduct} />

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