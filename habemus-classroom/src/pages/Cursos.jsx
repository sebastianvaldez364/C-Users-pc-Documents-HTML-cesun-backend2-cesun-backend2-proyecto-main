import { useState } from 'react'
import { Link } from 'react-router-dom'

import EstadoCarga from '../components/EstadoCarga'
import { useAjustes } from '../context/useAjustes'
import { useApi } from '../hooks/useApi'

/**
 * Página de Cursos de Habemus Classroom.
 *
 * Esta página muestra todos los cursos en los que el estudiante
 * se encuentra inscrito.
 *
 * Los cursos se presentan en formato de lista para facilitar
 * su consulta cuando el estudiante tiene varias materias.
 *
 * La información se obtiene desde el backend de Django.
 */
function Cursos() {

  const { t, idioma } = useAjustes()

  const resultado = useApi('/cursos/', idioma)

  /*
   * Estado utilizado para almacenar el texto escrito
   * por el usuario en el buscador.
   */
  const [busqueda, setBusqueda] = useState('')

  /*
   * Estado utilizado para ordenar los cursos.
   *
   * Valores disponibles:
   * - nombre: orden alfabético.
   * - progreso: mayor porcentaje de progreso primero.
   */
  const [orden, setOrden] = useState('nombre')

  const cursos = resultado.datos || []

  /*
   * Primero se filtran los cursos utilizando el texto
   * introducido en el buscador.
   */
  const cursosFiltrados = cursos.filter((curso) =>
    curso.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  )

  /*
   * Se crea una copia del arreglo filtrado para poder
   * ordenarlo sin modificar directamente los datos originales.
   */
  const cursosOrdenados = [...cursosFiltrados].sort((a, b) => {

    if (orden === 'progreso') {
      return b.progreso - a.progreso
    }

    return a.nombre.localeCompare(b.nombre)
  })

  return (
    <main className="cursos-page">

      {/* Encabezado principal */}
      <section className="cursos-title">

        <h1>{t('cursos_titulo')}</h1>

        <p>{t('cursos_sub')}</p>

      </section>

      {/* Herramientas para buscar y ordenar cursos */}
      <section className="cursos-tools">

        <div className="curso-search">

          <span>🔎</span>

          <input
            type="text"
            placeholder={t('buscar_curso')}
            aria-label={t('buscar_curso')}
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
          />

        </div>

        <select
          value={orden}
          aria-label={t('ordenar_nombre')}
          onChange={(event) => setOrden(event.target.value)}
        >

          <option value="nombre">
            {t('ordenar_nombre')}
          </option>

          <option value="progreso">
            {t('ordenar_progreso')}
          </option>

        </select>

      </section>

      <EstadoCarga
        cargando={resultado.cargando}
        error={resultado.error}
      />

      {/* Lista de cursos disponibles */}
      <section className="cursos-list">

        {cursosOrdenados.map((curso) => (

          <article
            className="curso-list-item"
            key={curso.id}
          >

            {/* Imagen o identificador visual del curso */}
            <div className="curso-list-image">

              <span>
                {curso.nombre.charAt(0)}
              </span>

            </div>

            {/* Información principal */}
            <div className="curso-list-info">

              <span className="curso-code">
                {curso.codigo}
              </span>

              <h2>{curso.nombre}</h2>

              <p className="curso-description">
                {curso.descripcion}
              </p>

              <p className="curso-teacher">
                {t('profesor')}: {curso.profesor}
              </p>

              {/* Progreso del estudiante */}
              <div className="curso-progress-container">

                <div className="curso-progress-text">

                  <span>{t('progreso')}</span>

                  <span>{curso.progreso}%</span>

                </div>

                <div className="curso-list-progress-bar">

                  <div
                    className="curso-list-progress"
                    style={{ width: `${curso.progreso}%` }}
                  ></div>

                </div>

              </div>

            </div>

            {/* Acción correspondiente al curso */}
            <div className="curso-list-action">

              <Link to={`/clases/${curso.id}`}>
                {t('entrar_curso')}
              </Link>

            </div>

          </article>

        ))}

        {/*
         * Este mensaje solamente aparece cuando
         * el buscador no encuentra ningún curso.
         */}
        {!resultado.cargando &&
          !resultado.error &&
          cursosOrdenados.length === 0 && (

          <div className="no-courses">

            <h3>{t('sin_cursos')}</h3>

            <p>{t('sin_cursos_sub')}</p>

          </div>

        )}

      </section>

    </main>
  )
}

export default Cursos
