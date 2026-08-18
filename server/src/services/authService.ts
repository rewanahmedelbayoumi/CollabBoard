import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'

import type {
  LoginRequest,
  PublicUser,
  RegisterRequest,
  User,
} from '../types/auth'

const users: User[] = []

const toPublicUser = (user: User): PublicUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
})

export const registerUser = async (
  data: RegisterRequest,
): Promise<PublicUser> => {
  const existingUser = users.find(
    (user) => user.email.toLowerCase() === data.email.toLowerCase(),
  )

  if (existingUser) {
    throw new Error('Email is already registered')
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10,
  )

  const user: User = {
    id: randomUUID(),
    name: data.name,
    email: data.email.toLowerCase(),
    password: hashedPassword,
  }

  users.push(user)

  return toPublicUser(user)
}

export const loginUser = async (
  data: LoginRequest,
): Promise<PublicUser> => {
  const user = users.find(
    (item) =>
      item.email.toLowerCase() ===
      data.email.toLowerCase(),
  )

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const passwordMatches = await bcrypt.compare(
    data.password,
    user.password,
  )

  if (!passwordMatches) {
    throw new Error('Invalid email or password')
  }

  return toPublicUser(user)
}