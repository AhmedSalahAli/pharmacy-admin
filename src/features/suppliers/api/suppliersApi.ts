import type {
  Supplier,
  CreateSupplierInput,
  UpdateSupplierInput,
} from '../types/supplier';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type SuppliersResponse = {
  data: Supplier[];
};

export async function getSuppliers(): Promise<Supplier[]> {
  const response = await fetch(`${API_BASE_URL}/suppliers`);

  if (!response.ok) {
    throw new Error('Failed to fetch suppliers');
  }

  const result: SuppliersResponse = await response.json();

  return result.data;
}

export async function createSupplier(
  supplierInput: CreateSupplierInput,
): Promise<Supplier> {
  const response = await fetch(`${API_BASE_URL}/suppliers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(supplierInput),
  });

  if (!response.ok) {
    throw new Error('Failed to create supplier');
  }

  return response.json();
}

export async function updateSupplier(
  id: number,
  supplierInput: UpdateSupplierInput,
): Promise<Supplier> {
  const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(supplierInput),
  });

  if (!response.ok) {
    throw new Error('Failed to update supplier');
  }

  return response.json();
}

export async function deleteSupplierById(
  id: number,
): Promise<Supplier> {
  const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete supplier');
  }

  return response.json();
}