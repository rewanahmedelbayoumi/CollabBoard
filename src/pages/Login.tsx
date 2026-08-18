import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { loginSchema, type LoginFormData } from '../schemas/authSchema'
import { login } from '../services/auth'
import { useAuthStore } from '../store/authStore'

function Login() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data)

      setAuth(response.user, response.token)

      navigate('/board', { replace: true })
    } catch {
      setError('root', {
        message:
          'Login failed. Please check your email and password.',
      })
    }
  }

  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
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
            placeholder="Enter your password"
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
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <p>
        Don't have an account?{' '}
        <Link to="/register">Register</Link>
      </p>
    </main>
  )
}

export default Login