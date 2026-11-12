import { Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ResumeAI from './pages/ResumeAI'
import SkillGap from './pages/SkillGap'
import Jobs from './pages/Jobs'


// ================= PROTECTED ROUTE =================

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('user')

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}


// ================= APP =================

function App() {
  return (
    <Routes>

      {/* ================= LANDING PAGE ================= */}

      <Route
        path="/"
        element={<LandingPage />}
      />


      {/* ================= AUTHENTICATION ================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />


      {/* ================= DASHBOARD ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />


      {/* ================= RESUME AI ================= */}

      <Route
        path="/resume-ai"
        element={
          <ProtectedRoute>
            <ResumeAI />
          </ProtectedRoute>
        }
      />


      {/* ================= SKILL GAP ================= */}

      <Route
        path="/skill-gap"
        element={
          <ProtectedRoute>
            <SkillGap />
          </ProtectedRoute>
        }
      />


      {/* ================= JOBS ================= */}

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />


      {/* ================= UNKNOWN URL ================= */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  )
}

export default App    