import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import {
  loginUser,
  registerUser,
} from '../services/authService'

const JWT_SECRET =
  process.env.JWT_SECRET || 'collabboard-development-secret'

export const register = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      })
    }

    const user = await registerUser({
      name,
      email,
      password,
    })

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: '1h',
      },
    )

    return res.status(201).json({
      user,
      token,
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Registration failed'

    return res.status(400).json({
      message,
    })
  }
}

export const login = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      })
    }

    const user = await loginUser({
      email,
      password,
    })

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: '1h',
      },
    )

    return res.status(200).json({
      user,
      token,
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Login failed'

    return res.status(401).json({
      message,
    })
  }
}