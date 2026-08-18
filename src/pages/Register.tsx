import { Link } from 'react-router-dom'

import './Auth.css'

function Register() {
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

        <form className="auth-form">
          <div className="form-field">
            <label htmlFor="name">
              Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Create a password"
            />
          </div>

          <button
            className="auth-submit"
            type="submit"
          >
            Create account
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