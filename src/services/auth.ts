import { apiRequest } from './api'

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export type AuthUser = {
  id: string | number
  name: string
  email: string
  avatar?: string
  isOnline?: boolean
}

export type AuthResponse = {
  user: AuthUser
  token?: string
}

export const login = (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export const register = (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}