import { Link } from 'react-router-dom'

function Login() {
  return (
    <main>
      <h1>Login</h1>

      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit">
          Login
        </button>
      </form>

      <p>
        Don't have an account?{' '}
        <Link to="/register">
          Register
        </Link>
      </p>
    </main>
  )
}

export default Login