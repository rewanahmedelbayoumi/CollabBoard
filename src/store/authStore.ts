import { create } from 'zustand'
import type { AuthUser } from '../services/auth'

type AuthState = {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean

  setAuth: (user: AuthUser, token?: string) => void
  logout: () => void
}

const savedUser = localStorage.getItem('collabboard-user')
const savedToken = localStorage.getItem('collabboard-token')

const initialUser: AuthUser | null = savedUser
  ? JSON.parse(savedUser)
  : null

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  token: savedToken,
  isAuthenticated: Boolean(initialUser),

  setAuth: (user, token) => {
    localStorage.setItem(
      'collabboard-user',
      JSON.stringify(user),
    )

    if (token) {
      localStorage.setItem('collabboard-token', token)
    }

    set({
      user,
      token: token ?? null,
      isAuthenticated: true,
    })
  },

  logout: () => {
    localStorage.removeItem('collabboard-user')
    localStorage.removeItem('collabboard-token')

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    })
  },
}))