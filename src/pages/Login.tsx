import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { loginSchema, type LoginFormData } from '../schemas/authSchema'
import { login } from '../services/auth'
import { useAuthStore } from '../store/authStore'

import './Auth.css'

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
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo">CollabBoard</span>

          <span className="auth-badge">
            WORKSPACE
          </span>
        </div>

        <div className="auth-heading">
          <p className="auth-eyebrow">
            WELCOME BACK
          </p>

          <h1>
            Sign in to your workspace.
          </h1>

          <p>
            Continue managing your projects, tasks,
            and team collaboration.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-field">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
            />

            {errors.email && (
              <p
                className="field-error"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password')}
            />

            {errors.password && (
              <p
                className="field-error"
                role="alert"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          {errors.root && (
            <p
              className="auth-error"
              role="alert"
            >
              {errors.root.message}
            </p>
          )}

          <button
            className="auth-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Signing in...'
              : 'Sign in'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}

          <Link to="/register">
            Create one
          </Link>
        </p>
      </div>
    </main>
  )
}

export default Login