import { useEffect, useState } from 'react';

import type {
  Supplier,
  CreateSupplierInput,
} from '../types/supplier';

type CreateSupplierFormProps = {
  onSaveSupplier: (supplier: CreateSupplierInput) => void;
  isSubmitting: boolean;
  editingSupplier: Supplier | null;
  onCancelEdit: () => void;
};

function CreateSupplierForm({
  onSaveSupplier,
  isSubmitting,
  editingSupplier,
  onCancelEdit,
}: CreateSupplierFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!editingSupplier) {
      return;
    }

    setName(editingSupplier.name);
    setPhone(editingSupplier.phone ?? '');
    setEmail(editingSupplier.email ?? '');
    setAddress(editingSupplier.address ?? '');
    setErrorMessage('');
  }, [editingSupplier]);

  function clearForm() {
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setErrorMessage('');
  }

  function handleCancelEdit() {
    clearForm();
    onCancelEdit();
  }

  function handleSubmit() {
    if (name.trim().length === 0) {
      setErrorMessage('Supplier name is required');
      return;
    }

    const supplierInput: CreateSupplierInput = {
      name: name.trim(),
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      address: address.trim() || undefined,
    };

    onSaveSupplier(supplierInput);

    clearForm();
  }

  return (
    <div className="suppliers-form">
      <h2 className="suppliers-section-title">
        {editingSupplier ? 'Edit Supplier' : 'Add Supplier'}
      </h2>

      {errorMessage && (
        <p className="suppliers-message-error">{errorMessage}</p>
      )}

      <div className="suppliers-form-grid">
        <input
          className="suppliers-input"
          placeholder="Supplier name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          className="suppliers-input"
          placeholder="Phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />

        <input
          className="suppliers-input"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          className="suppliers-input"
          placeholder="Address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>

      <div className="suppliers-actions">
        <button
          className="suppliers-button suppliers-button-primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? editingSupplier
              ? 'Saving...'
              : 'Adding...'
            : editingSupplier
              ? 'Save Changes'
              : 'Add Supplier'}
        </button>

        {editingSupplier && (
          <button
            className="suppliers-button suppliers-button-secondary"
            onClick={handleCancelEdit}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default CreateSupplierForm;