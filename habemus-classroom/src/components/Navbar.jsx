import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAjustes } from '../context/useAjustes'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { t } = useAjustes()
  const { usuario, cerrarSesion } = useAuth()
  const navegar = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)

  async function salir() {
    await cerrarSesion()
    navegar('/login', { replace: true })
  }

  return (
    <nav className="navbar" aria-label="Navegacion principal">
      <Link to="/" className="navbar-logo">Habemus</Link>
      <div className="navbar-links">
        <NavLink to="/" end>{t('nav_inicio')}</NavLink>
        <NavLink to="/horarios">{t('nav_horarios')}</NavLink>
        <NavLink to="/clases">{t('nav_clases')}</NavLink>
        <NavLink to="/cursos">{t('nav_cursos')}</NavLink>
        <NavLink to="/tareas">{t('nav_tareas')}</NavLink>
        <NavLink to="/apoyo">{t('nav_apoyo')}</NavLink>
      </div>

      <div className="profile-container">
        <button type="button" className="profile-button" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Abrir menu de usuario" aria-expanded={menuAbierto}>👤</button>
        {menuAbierto && (
          <div className="profile-menu">
            <div className="profile-info">
              <div className="profile-avatar" aria-hidden="true">👤</div>
              <div>
                <h4>{usuario?.nombre || usuario?.username}</h4>
                <p>{usuario?.rol === 'docente' ? 'Docente' : 'Alumno'}</p>
              </div>
            </div>
            <div className="profile-divider"></div>
            <button className="profile-option" onClick={() => { setMenuAbierto(false); navegar('/configuracion') }}>{t('perfil_configuracion')}</button>
            <button className="profile-option logout" onClick={salir}>{t('perfil_cerrar_sesion')}</button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
