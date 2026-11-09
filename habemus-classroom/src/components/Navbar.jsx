import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { useAjustes } from '../context/useAjustes'

/**
 * Componente Navbar.
 *
 * Proporciona navegación entre las diferentes
 * secciones de Habemus Classroom.
 *
 * También administra la visualización del menú
 * desplegable del perfil del estudiante.
 */
function Navbar() {

  const { t } = useAjustes()

  const navegar = useNavigate()

  // Controla si el menú del perfil está visible.
  const [menuAbierto, setMenuAbierto] = useState(false)

  /**
   * Alterna la visibilidad del menú de usuario.
   */
  const cambiarMenuPerfil = () => {
    setMenuAbierto(!menuAbierto)
  }

  /**
   * Abre la página de configuración y cierra el menú.
   */
  const abrirConfiguracion = () => {
    setMenuAbierto(false)
    navegar('/configuracion')
  }

  return (
    <nav className="navbar">

      {/* Logotipo y acceso a la página principal */}
      <Link to="/" className="navbar-logo">
        Habemus
      </Link>

      {/* Opciones principales de navegación */}
      <div className="navbar-links">

        <NavLink to="/" end>
          {t('nav_inicio')}
        </NavLink>

        <NavLink to="/horarios">
          {t('nav_horarios')}
        </NavLink>

        <NavLink to="/clases">
          {t('nav_clases')}
        </NavLink>

        <NavLink to="/cursos">
          {t('nav_cursos')}
        </NavLink>

        <NavLink to="/tareas">
          {t('nav_tareas')}
        </NavLink>

        <NavLink to="/apoyo">
          {t('nav_apoyo')}
        </NavLink>

      </div>

      {/* Menú del perfil del estudiante */}
      <div className="profile-container">

        <button
          type="button"
          className="profile-button"
          onClick={cambiarMenuPerfil}
          aria-label={t('perfil_abrir')}
          aria-expanded={menuAbierto}
        >
          👤
        </button>

        {/* Renderizado condicional del menú */}
        {menuAbierto && (

          <div className="profile-menu">

            {/* Información del usuario */}
            <div className="profile-info">

              <div className="profile-avatar">
                👤
              </div>

              <div>
                <h4>Sebastián Valdez</h4>
                <p>{t('perfil_estudiante')}</p>
              </div>

            </div>

            <div className="profile-divider"></div>

            {/* Opciones que implementaremos después */}
            <button className="profile-option">
              {t('perfil_mi_perfil')}
            </button>

            <button
              className="profile-option"
              onClick={abrirConfiguracion}
            >
              {t('perfil_configuracion')}
            </button>

            <button className="profile-option">
              {t('perfil_accesibilidad')}
            </button>

            <div className="profile-divider"></div>

            <button className="profile-option logout">
              {t('perfil_cerrar_sesion')}
            </button>

          </div>

        )}

      </div>

    </nav>
  )
}

export default Navbar
