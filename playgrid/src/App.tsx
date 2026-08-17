import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Tournaments from './pages/Tournaments'
import TournamentDetails from './pages/TournamentDetails'
import News from './pages/News'
import NewsDetails from './pages/NewsDetails'
import Coaches from './pages/Coaches'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import MyRegistrations from './pages/MyRegistrations'
import NotFound from './pages/NotFound'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminTournaments from './pages/admin/AdminTournaments'
import AdminNews from './pages/admin/AdminNews'
import AdminCoaches from './pages/admin/AdminCoaches'
import AdminRegistrations from './pages/admin/AdminRegistrations'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminRoute from './routes/AdminRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tournaments" element={<Tournaments />} />
      <Route path="/tournaments/:id" element={<TournamentDetails />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/:id" element={<NewsDetails />} />
      <Route path="/coaches" element={<Coaches />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-registrations"
        element={
          <ProtectedRoute>
            <MyRegistrations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/tournaments"
        element={
          <AdminRoute>
            <AdminTournaments />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/news"
        element={
          <AdminRoute>
            <AdminNews />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/coaches"
        element={
          <AdminRoute>
            <AdminCoaches />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/registrations"
        element={
          <AdminRoute>
            <AdminRegistrations />
          </AdminRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
