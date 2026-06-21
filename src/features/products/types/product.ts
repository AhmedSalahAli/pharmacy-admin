export type Supplier = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  isActive: boolean;
  createdAt: string;
};

export type Product = {
  id: number;
  name: string;
  barcode: string;
  price: number;
  quantity: number;
  supplierId: number | null;
  supplier: Supplier | null;
  isAvailable: boolean;
  createdAt: string;
};

export type CreateProductInput = {
  name: string;
  barcode: string;
  price: number;
  quantity: number;
  isAvailable: boolean;
  supplierId?: number;
};