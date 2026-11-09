import { Link } from 'react-router-dom'

import EstadoCarga from '../components/EstadoCarga'
import { useAjustes } from '../context/useAjustes'
import { useApi } from '../hooks/useApi'
import {
  buscarProximaClase,
  describirDia,
  estaVencida,
  fechaCorta,
  formatoHora
} from '../utils/fechas'

/**
 * Página de inicio de Habemus Classroom.
 *
 * Muestra un resumen con:
 * - La próxima clase (calculada con la fecha y hora del dispositivo).
 * - La tarea pendiente más cercana.
 * - Los cursos del estudiante, con acceso a la página de cada materia.
 *
 * Toda la información viene del backend de Django.
 */
function Home() {

  const { t, idioma, locale } = useAjustes()

  const cursos = useApi('/cursos/', idioma)
  const tareas = useApi('/tareas/', idioma)

  const ahora = new Date()

  // Saludo según la hora del dispositivo.
  const hora = ahora.getHours()

  const claveSaludo =
    hora < 12
      ? 'saludo_manana'
      : hora < 19
        ? 'saludo_tarde'
        : 'saludo_noche'

  // Próxima clase entre todos los cursos.
  const proxima = cursos.datos
    ? buscarProximaClase(cursos.datos, ahora)
    : null

  // Las tareas llegan ordenadas por fecha: la primera que
  // todavía no vence es la tarea pendiente más cercana.
  const pendiente = tareas.datos
    ? tareas.datos.find((tarea) => !estaVencida(tarea, ahora))
    : null

  return (
    <main className="home">

      <section className="welcome">
        <h1>{t(claveSaludo, { nombre: 'Sebastián' })}</h1>
        <p>{t('home_resumen')}</p>
      </section>

      <EstadoCarga
        cargando={cursos.cargando || tareas.cargando}
        error={cursos.error || tareas.error}
      />

      <section className="summary">

        {/* Próxima clase */}
        <div className="summary-card">
          <div className="card-icon">📚</div>

          <div>
            <span className="card-label">
              {t('proxima_clase')}
            </span>

            {proxima ? (
              <>
                <h2>{proxima.curso.nombre}</h2>

                <p>
                  {describirDia(proxima.inicio, locale, t, ahora)}
                  {' · '}
                  {formatoHora(proxima.horario.hora_inicio)}
                  {' - '}
                  {formatoHora(proxima.horario.hora_fin)}
                </p>

                <Link
                  to={`/clases/${proxima.curso.id}`}
                  className="summary-link"
                >
                  {t('ver_clase')}
                </Link>
              </>
            ) : (
              <p>{t('sin_proxima_clase')}</p>
            )}
          </div>
        </div>

        {/* Tarea pendiente */}
        <div className="summary-card">
          <div className="card-icon">📝</div>

          <div>
            <span className="card-label">
              {t('tarea_pendiente')}
            </span>

            {pendiente ? (
              <>
                <h2>{pendiente.titulo}</h2>

                <p>
                  {t('entrega', {
                    fecha: `${fechaCorta(pendiente.fecha_entrega, locale)}, ${formatoHora(pendiente.hora_entrega)}`
                  })}
                </p>

                <Link
                  to={`/tareas/${pendiente.id}`}
                  className="summary-link"
                >
                  {t('ver_tarea')}
                </Link>
              </>
            ) : (
              <p>{t('sin_tareas_pendientes')}</p>
            )}
          </div>
        </div>

      </section>

      <section className="courses">

        <div className="section-header">
          <h2>{t('mis_cursos')}</h2>

          <Link to="/cursos" className="see-all">
            {t('ver_todos')}
          </Link>
        </div>

        <div className="courses-grid">

          {(cursos.datos || []).map((curso) => (

            <div
              className={`course-card color-${curso.color}`}
              key={curso.id}
            >

              <div className="course-header">
                <span>{t('curso_etiqueta')}</span>
              </div>

              <div className="course-content">

                <h3>{curso.nombre}</h3>

                <p className="teacher">
                  {curso.profesor}
                </p>

                <div className="progress-info">
                  <span>{t('progreso')}</span>
                  <span>{curso.progreso}%</span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${curso.progreso}%` }}
                  ></div>
                </div>

                {/* Lleva a la página principal de la materia */}
                <Link
                  to={`/clases/${curso.id}`}
                  className="continue-button continue-link"
                >
                  {t('continuar')}
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  )
}

export default Home
