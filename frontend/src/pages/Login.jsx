import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Please fill in all fields')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      // Save logged-in user
      localStorage.setItem('user', JSON.stringify(data.user))

      alert('Login successful!')

      // Go to dashboard
      navigate('/dashboard')

    } catch (error) {
      console.error('Login error:', error)
      alert('Unable to connect to server')
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p>
          Login to continue with CareerForge AI.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />


          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          <button type="submit">
            Login
          </button>

        </form>


        <p className="auth-link">
          Don't have an account?{' '}

          <Link to="/signup">
            Create Account
          </Link>

        </p>

      </div>

    </div>
  )
}

export default Login