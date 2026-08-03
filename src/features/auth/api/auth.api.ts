import { api } from '../../../shared/api/http';
import type { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse, User } from '../types/auth';

export async function login(
  payload: LoginRequest,
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', payload);

  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>("/auth/me");

  return response.data;
}

export async function refreshTokens(
  payload: RefreshTokenRequest,
): Promise<RefreshTokenResponse> {
  const response = await api.post<RefreshTokenResponse>(
    '/auth/refresh',
    payload,
  );

  return response.data;
}
