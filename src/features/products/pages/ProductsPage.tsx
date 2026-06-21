import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import CreateProductForm from '../components/CreateProductForm';
import type { Product, CreateProductInput } from '../types/product';

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialProducts: Product[] = [
      {
        id: 1,
        name: 'Panadol Extra',
        price: 35.5,
        quantity: 100,
      },
      {
        id: 2,
        name: 'Brufen 400mg',
        price: 48.75,
        quantity: 50,
      },
    ];

    setProducts(initialProducts);
    setIsLoading(false);
  }, []);

  function addProduct(productInput: CreateProductInput) {
    const newProduct: Product = {
      id: Date.now(),
      name: productInput.name,
      price: productInput.price,
      quantity: productInput.quantity,
    };

    setProducts([...products, newProduct]);
  }

  function deleteProduct(id: number) {
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
            price={product.price}
            quantity={product.quantity}
            onDelete={deleteProduct}
          />
        ))
      )}
    </div>
  );
}

export default ProductsPage;