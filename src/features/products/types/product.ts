export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type CreateProductInput = {
  name: string;
  price: number;
  quantity: number;
};