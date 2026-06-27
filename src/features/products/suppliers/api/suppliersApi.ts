import type { Supplier } from '../types/supplier';
import { API_BASE_URL } from '@shared/config/api';

async function handleError(response: Response) {
  const errorBody = await response.json().catch(() => null);

  console.error('API Error:', {
    status: response.status,
    body: errorBody,
  });

  throw new Error(
    errorBody?.message
      ? JSON.stringify(errorBody.message)
      : 'API request failed',
  );
}

export async function getSuppliers(): Promise<Supplier[]> {
  const response = await fetch(`${API_BASE_URL}/suppliers`);

  if (!response.ok) {
    await handleError(response);
  }

  const result = await response.json();

  if (Array.isArray(result)) {
    return result;
  }

  return result.data;
}