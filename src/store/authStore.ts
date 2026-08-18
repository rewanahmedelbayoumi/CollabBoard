import { create } from 'zustand'
import type { AuthUser } from '../services/auth'

type AuthState = {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean

  setAuth: (user: AuthUser, token?: string) => void
  logout: () => void
}

const getSavedUser = (): AuthUser | null => {
  const savedUser = localStorage.getItem('collabboard-user')

  if (!savedUser) {
    return null
  }

  try {
    return JSON.parse(savedUser) as AuthUser
  } catch {
    localStorage.removeItem('collabboard-user')
    return null
  }
}

const getSavedToken = (): string | null => {
  return localStorage.getItem('collabboard-token')
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getSavedUser(),
  token: getSavedToken(),
  isAuthenticated: Boolean(getSavedUser()),

  setAuth: (user, token) => {
    localStorage.setItem(
      'collabboard-user',
      JSON.stringify(user),
    )

    if (token) {
      localStorage.setItem(
        'collabboard-token',
        token,
      )
    } else {
      localStorage.removeItem('collabboard-token')
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