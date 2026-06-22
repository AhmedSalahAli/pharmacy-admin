import { useEffect, useState } from 'react';
import type { Product, CreateProductInput } from '../types/product';

type CreateProductFormProps = {
  onAddProduct: (product: CreateProductInput) => void;
  isSubmitting: boolean;
  editingProduct: Product | null;
  onCancelEdit: () => void;
};

function CreateProductForm({
  onAddProduct,
  isSubmitting,
  editingProduct,
  onCancelEdit,
}: CreateProductFormProps) {
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!editingProduct) {
      return;
    }

    setName(editingProduct.name);
    setBarcode(editingProduct.barcode);
    setPrice(String(editingProduct.price));
    setQuantity(String(editingProduct.quantity));
    setErrorMessage('');
  }, [editingProduct]);

  function clearForm() {
    setName('');
    setBarcode('');
    setPrice('');
    setQuantity('');
    setErrorMessage('');
  }

  function handleCancelEdit() {
    clearForm();
    onCancelEdit();
  }

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

    const productInput: CreateProductInput = {
      name,
      barcode,
      price: Number(price),
      quantity: Number(quantity),
      isAvailable: true,
    };

    onAddProduct(productInput);

    clearForm();
  }

  return (
    <div>
      <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>

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

      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting
          ? editingProduct
            ? 'Saving...'
            : 'Adding...'
          : editingProduct
            ? 'Save Changes'
            : 'Add Product'}
      </button>

      {editingProduct && (
        <button onClick={handleCancelEdit} disabled={isSubmitting}>
          Cancel
        </button>
      )}
    </div>
  );
}

export default CreateProductForm;