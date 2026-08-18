import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

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

export const login = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  const response = await authApi.post<AuthResponse>(
    '/auth/login',
    payload,
  )

  return response.data
}

export const register = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  const response = await authApi.post<AuthResponse>(
    '/auth/register',
    payload,
  )

  return response.data
}