import { Link } from 'react-router-dom'

import EstadoCarga from '../components/EstadoCarga'
import { useAjustes } from '../context/useAjustes'
import { useApi } from '../hooks/useApi'
import { formatoHora, nombreDia } from '../utils/fechas'

/**
 * Página de Clases de Habemus Classroom.
 *
 * Muestra las clases en las que el estudiante se encuentra inscrito.
 * Cada tarjeta lleva a la página de la materia, donde están la
 * introducción, el horario, las tareas y los materiales de apoyo.
 *
 * La información se obtiene desde el backend de Django.
 */
function Clases() {

  const { t, idioma, locale } = useAjustes()

  const cursos = useApi('/cursos/', idioma)

  return (
    <main className="clases-page">

      {/* Encabezado principal de la página */}
      <section className="welcome">
        <h1>{t('clases_titulo')}</h1>
        <p>{t('clases_sub')}</p>
      </section>

      <EstadoCarga
        cargando={cursos.cargando}
        error={cursos.error}
      />

      {/* Contenedor de las tarjetas de clases */}
      <section className="clases-grid">

        {(cursos.datos || []).map((clase) => (

          <article
            className={`clase-card color-${clase.color}`}
            key={clase.id}
          >

            {/* Encabezado visual de la clase */}
            <div className="clase-card-header">
              <span>{t('clase_etiqueta')}</span>
              <div className="clase-icon">📖</div>
            </div>

            {/* Información principal */}
            <div className="clase-card-content">

              <h2>{clase.nombre}</h2>

              <p className="clase-profesor">
                {t('profesor')}: {clase.profesor}
              </p>

              <div className="clase-details">

                <div>
                  <span className="detail-label">
                    {t('horario')}
                  </span>

                  {clase.horarios.map((horario) => (
                    <p key={horario.id}>
                      {nombreDia(horario.dia_semana, locale)}
                      {' · '}
                      {formatoHora(horario.hora_inicio)}
                      {' - '}
                      {formatoHora(horario.hora_fin)}
                    </p>
                  ))}
                </div>

                <div>
                  <span className="detail-label">
                    {t('modalidad')}
                  </span>

                  <p>{t(`modalidad_${clase.modalidad}`)}</p>
                </div>

                <div>
                  <span className="detail-label">
                    {t('aula')}
                  </span>

                  <p>{clase.aula}</p>
                </div>

              </div>

              {/* Abre la página principal de la materia */}
              <Link
                to={`/clases/${clase.id}`}
                className="clase-button clase-link"
              >
                {t('ver_clase')}
              </Link>

            </div>

          </article>

        ))}

      </section>

    </main>
  )
}

export default Clases
