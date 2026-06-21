import { useState } from 'react';
import type { CreateProductInput } from '../types/product';

type CreateProductFormProps = {
  onAddProduct: (product: CreateProductInput) => void;
};

function CreateProductForm({ onAddProduct }: CreateProductFormProps) {
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit() {
    if (name.trim().length === 0) {
      setErrorMessage('Product name is required');
      return;
    }

    if (barcode.trim().length === 0) {
      setErrorMessage('Barcode is required');
      return;
    }

    if (Number(price) <= 0) {
      setErrorMessage('Price must be greater than 0');
      return;
    }

    if (Number(quantity) < 0) {
      setErrorMessage('Quantity cannot be negative');
      return;
    }

    const newProduct: CreateProductInput = {
      name,
      barcode,
      price: Number(price),
      quantity: Number(quantity),
      isAvailable: true,
    };

    onAddProduct(newProduct);

    setName('');
    setBarcode('');
    setPrice('');
    setQuantity('');
    setErrorMessage('');
  }

  return (
    <div>
      <h2>Add Product</h2>

      {errorMessage && <p>{errorMessage}</p>}

      <input
        placeholder="Product name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        placeholder="Barcode"
        value={barcode}
        onChange={(event) => setBarcode(event.target.value)}
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