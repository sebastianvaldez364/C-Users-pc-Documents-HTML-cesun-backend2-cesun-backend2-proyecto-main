import { createContext, useContext, useEffect, useState } from 'react'
import { API_URL } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('habemus.token'))
  const [usuario, setUsuario] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('habemus.usuario'))
    } catch {
      return null
    }
  })
  const [cargando, setCargando] = useState(Boolean(token))

  useEffect(() => {
    if (!token) {
      setUsuario(null)
      setCargando(false)
      return
    }

    fetch(`${API_URL}/auth/me/`, {
      headers: { Authorization: `Token ${token}` }
    })
      .then((response) => {
        if (!response.ok) throw new Error('Sesion no valida')
        return response.json()
      })
      .then((data) => {
        setUsuario(data.usuario)
        localStorage.setItem('habemus.usuario', JSON.stringify(data.usuario))
      })
      .catch(() => {
        localStorage.removeItem('habemus.token')
        localStorage.removeItem('habemus.usuario')
        setToken(null)
        setUsuario(null)
      })
      .finally(() => setCargando(false))
  }, [token])

  async function iniciarSesion(username, password) {
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.detail || 'No se pudo iniciar sesion')

    localStorage.setItem('habemus.token', data.token)
    localStorage.setItem('habemus.usuario', JSON.stringify(data.usuario))
    setToken(data.token)
    setUsuario(data.usuario)
    return data.usuario
  }

  async function cerrarSesion() {
    if (token) {
      try {
        await fetch(`${API_URL}/auth/logout/`, {
          method: 'POST',
          headers: { Authorization: `Token ${token}` }
        })
      } catch {
        // Se limpia la sesion local aunque el servidor no responda.
      }
    }
    localStorage.removeItem('habemus.token')
    localStorage.removeItem('habemus.usuario')
    setToken(null)
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ token, usuario, cargando, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe utilizarse dentro de AuthProvider')
  return context
}
