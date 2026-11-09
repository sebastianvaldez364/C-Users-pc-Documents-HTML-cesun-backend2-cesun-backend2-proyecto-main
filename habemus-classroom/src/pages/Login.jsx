import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { iniciarSesion, usuario } = useAuth()
  const navegar = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (usuario) return <Navigate to="/" replace />

  async function enviar(event) {
    event.preventDefault()
    setError('')
    setEnviando(true)
    try {
      await iniciarSesion(username, password)
      navegar('/', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={enviar}>
        <h1>Habemus Classroom</h1>
        <p>Inicia sesion para continuar</p>

        <label htmlFor="username">Usuario</label>
        <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />

        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />

        {error && <p className="login-error" role="alert">{error}</p>}

        <button type="submit" disabled={enviando}>
          {enviando ? 'Ingresando...' : 'Iniciar sesion'}
        </button>
      </form>
    </main>
  )
}

export default Login
