import { useAuthStore } from '../store/authStore'

function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <main>
      <header>
        <div>
          <h1>Dashboard</h1>

          <p>
            Welcome back, {user?.name ?? 'User'}.
          </p>
        </div>

        <button
          type="button"
          onClick={logout}
        >
          Logout
        </button>
      </header>

      <section>
        <h2>Your workspaces</h2>

        <p>
          No boards yet. Create your first board to get
          started.
        </p>
      </section>
    </main>
  )
}

export default Dashboard