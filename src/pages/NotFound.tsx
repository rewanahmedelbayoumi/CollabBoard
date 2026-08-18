import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main>
      <h1>404</h1>

      <p>
        The page you are looking for does not exist.
      </p>

      <Link to="/login">
        Back to Login
      </Link>
    </main>
  )
}

export default NotFound