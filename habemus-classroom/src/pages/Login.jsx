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
      await iniciarSesion(username.trim(), password)
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
        <p>Inicia sesión para continuar</p>

        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          placeholder="Alumno o Docentebd"
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="1234"
          required
        />

        <div className="login-demo">
          <strong>Cuentas de demostración</strong>
          <p>Alumno — 1234</p>
          <p>Base de Datos: Docentebd — 1234</p>
          <small>Las demás cuentas docentes se crean con “Docente” + las iniciales de su materia.</small>
        </div>

        {error && <p className="login-error" role="alert">{error}</p>}

        <button type="submit" disabled={enviando}>
          {enviando ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>
    </main>
  )
}

export default Login
