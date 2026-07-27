export type Supplier = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  isAvailable: boolean;
  createdAt: string;
};

export type CreateSupplierInput = {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
};

export type UpdateSupplierInput = Partial<CreateSupplierInput>;