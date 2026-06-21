import { useState } from 'react';
import type { CreateProductInput } from '../types/product';

type CreateProductFormProps = {
  onAddProduct: (product: CreateProductInput) => void;
};

function CreateProductForm({ onAddProduct }: CreateProductFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  function handleSubmit() {
    const newProduct: CreateProductInput = {
      name,
      price: Number(price),
      quantity: Number(quantity),
    };

    onAddProduct(newProduct);

    setName('');
    setPrice('');
    setQuantity('');
  }

  return (
    <div>
      <h2>Add Product</h2>

      <input
        placeholder="Product name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />

      <input
        placeholder="Quantity"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
      />

      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}

export default CreateProductForm;