import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import Board from '../pages/Board'
import Login from '../pages/Login'
import ProtectedRoute from './ProtectedRoute'
import Register from '../pages/Register'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
  path="/register"
  element={<Register />}
/>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/board"
            element={<Board />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter