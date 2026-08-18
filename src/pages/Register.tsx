import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import {
  registerSchema,
  type RegisterFormData,
} from '../schemas/authSchema'

import { register as registerUser } from '../services/auth'
import { useAuthStore } from '../store/authStore'

function Register() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data)

      setAuth(response.user, response.token)

      navigate('/board', { replace: true })
    } catch {
      setError('root', {
        message:
          'Registration failed. Please check your information and try again.',
      })
    }
  }

  return (
    <main>
      <h1>Create account</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>

          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register('name')}
          />

          {errors.name && (
            <p role="alert">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email')}
          />

          {errors.email && (
            <p role="alert">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Create a password"
            {...register('password')}
          />

          {errors.password && (
            <p role="alert">{errors.password.message}</p>
          )}
        </div>

        {errors.root && (
          <p role="alert">{errors.root.message}</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? 'Creating account...'
            : 'Create account'}
        </button>
      </form>

      <p>
        Already have an account?{' '}
        <Link to="/login">Login</Link>
      </p>
    </main>
  )
}

export default Register