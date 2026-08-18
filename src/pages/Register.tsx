import { Link } from 'react-router-dom'

function Register() {
  return (
    <main>
      <h1>Create account</h1>

      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
          />
        </div>

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
            placeholder="Create a password"
          />
        </div>

        <button type="submit">
          Create account
        </button>
      </form>

      <p>
        Already have an account?{' '}
        <Link to="/login">
          Login
        </Link>
      </p>
    </main>
  )
}

export default Register