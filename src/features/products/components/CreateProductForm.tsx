import { useEffect, useState } from 'react';
import type { Product, CreateProductInput } from '../types/product';
import { useQuery } from '@tanstack/react-query';
import { getSuppliers } from '../suppliers/api/suppliersApi';

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
  const [supplierId, setSupplierId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { data: suppliers = [] } = useQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
  });

  useEffect(() => {
    if (!editingProduct) {
      return;
    }

    setName(editingProduct.name);
    setBarcode(editingProduct.barcode);
    setPrice(String(editingProduct.price));
    setQuantity(String(editingProduct.quantity));
    setSupplierId(
      editingProduct.supplierId ? String(editingProduct.supplierId) : '',
    );
    setErrorMessage('');
  }, [editingProduct]);

  function clearForm() {
    setName('');
    setBarcode('');
    setPrice('');
    setQuantity('');
    setSupplierId('');
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
      supplierId: supplierId ? Number(supplierId) : undefined,
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

    
      <select
        value={supplierId}
        onChange={(event) => setSupplierId(event.target.value)}
      >
        <option value="">No supplier</option>
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name}
          </option>
        ))}

      </select>

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