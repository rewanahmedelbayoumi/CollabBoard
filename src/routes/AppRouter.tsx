import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import Board from '../pages/Board'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/board" replace />}
        />

        <Route
          path="/board"
          element={<Board />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter