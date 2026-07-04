import { useState } from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import CreateSupplierForm from '../components/CreateSupplierForm';
import SupplierCard from '../components/SupplierCard';

import type {
  Supplier,
  CreateSupplierInput,
  UpdateSupplierInput,
} from '../types/supplier';

import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplierById,
} from '../api/suppliersApi';

import '../suppliers.css';

function SuppliersPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [editingSupplier, setEditingSupplier] =
    useState<Supplier | null>(null);

  const queryClient = useQueryClient();

  const {
    data: suppliers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
  });

  const createSupplierMutation = useMutation({
    mutationFn: createSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['suppliers'],
      });
    },
    onError: () => {
      setErrorMessage('Failed to create supplier');
    },
  });

  const updateSupplierMutation = useMutation({
    mutationFn: ({
      id,
      supplierInput,
    }: {
      id: number;
      supplierInput: UpdateSupplierInput;
    }) => updateSupplier(id, supplierInput),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['suppliers'],
      });

      setEditingSupplier(null);
    },

    onError: () => {
      setErrorMessage('Failed to update supplier');
    },
  });

  const deleteSupplierMutation = useMutation({
    mutationFn: deleteSupplierById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['suppliers'],
      });
    },
    onError: () => {
      setErrorMessage('Failed to delete supplier');
    },
  });

  function saveSupplier(supplierInput: CreateSupplierInput) {
    setErrorMessage('');

    if (editingSupplier) {
      updateSupplierMutation.mutate({
        id: editingSupplier.id,
        supplierInput,
      });

      return;
    }

    createSupplierMutation.mutate(supplierInput);
  }

  function startEditingSupplier(id: number) {
    const selectedSupplier = suppliers.find(
      (supplier) => supplier.id === id,
    );

    if (!selectedSupplier) {
      return;
    }

    setEditingSupplier(selectedSupplier);
  }

  function deleteSupplier(id: number) {
    setErrorMessage('');
    deleteSupplierMutation.mutate(id);
  }

  const totalSuppliers = suppliers.length;

  return (
    <div className="suppliers-page">
      <div className="suppliers-page-header">
        <div>
          <h1 className="suppliers-page-title">Suppliers</h1>
          <p className="suppliers-page-subtitle">
            Manage pharmacy suppliers used in product management.
          </p>
        </div>
      </div>

      {errorMessage && (
        <p className="suppliers-message-error">{errorMessage}</p>
      )}

      {isError && (
        <p className="suppliers-message-error">
          Failed to load suppliers
        </p>
      )}

      <div className="suppliers-stats-grid">
        <div className="suppliers-stat-card">
          <p className="suppliers-stat-label">Total suppliers</p>
          <p className="suppliers-stat-value">{totalSuppliers}</p>
        </div>
      </div>

      <section className="suppliers-section">
        <CreateSupplierForm
          onSaveSupplier={saveSupplier}
          isSubmitting={
            createSupplierMutation.isPending ||
            updateSupplierMutation.isPending
          }
          editingSupplier={editingSupplier}
          onCancelEdit={() => setEditingSupplier(null)}
        />
      </section>

      <section className="suppliers-section">
        <h2 className="suppliers-section-title">Suppliers List</h2>

        {isLoading ? (
          <p>Loading suppliers...</p>
        ) : suppliers.length === 0 ? (
          <p>No suppliers found</p>
        ) : (
          <div className="suppliers-list">
            {suppliers.map((supplier) => (
              <SupplierCard
                key={supplier.id}
                id={supplier.id}
                name={supplier.name}
                phone={supplier.phone}
                email={supplier.email}
                address={supplier.address}
                isAvailable={supplier.isAvailable}
                onEdit={startEditingSupplier}
                onDelete={deleteSupplier}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default SuppliersPage;