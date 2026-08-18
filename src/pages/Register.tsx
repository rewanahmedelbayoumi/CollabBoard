import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import {
  registerSchema,
  type RegisterFormData,
} from '../schemas/authSchema'

import { register as registerUser } from '../services/auth'
import { useAuthStore } from '../store/authStore'

import './Auth.css'

function Register() {
  const navigate = useNavigate()

  const setAuth = useAuthStore(
    (state) => state.setAuth,
  )

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
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      setAuth(response.user, response.token)

      navigate('/board', {
        replace: true,
      })
    } catch {
      setError('root', {
        message:
          'Registration failed. Please try again.',
      })
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo">
            CollabBoard
          </span>

          <span className="auth-badge">
            WORKSPACE
          </span>
        </div>

        <div className="auth-heading">
          <p className="auth-eyebrow">
            CREATE ACCOUNT
          </p>

          <h1>
            Build your workspace.
          </h1>

          <p>
            Create your CollabBoard account and start
            collaborating with your team.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-field">
            <label htmlFor="name">
              Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register('name')}
            />

            {errors.name && (
              <p
                className="field-error"
                role="alert"
              >
                {errors.name.message}
              </p>
            )}
          </div>

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
              placeholder="Create a password"
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

          <div className="form-field">
            <label htmlFor="confirmPassword">
              Confirm password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register('confirmPassword')}
            />

            {errors.confirmPassword && (
              <p
                className="field-error"
                role="alert"
              >
                {errors.confirmPassword.message}
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
              ? 'Creating account...'
              : 'Create account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}

          <Link to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}

export default Register