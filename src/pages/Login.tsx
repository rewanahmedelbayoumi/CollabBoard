import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    console.log('Login data:', data)
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