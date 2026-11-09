import { Link, useParams } from 'react-router-dom'

import EstadoCarga from '../components/EstadoCarga'
import { useAjustes } from '../context/useAjustes'
import { useApi } from '../hooks/useApi'
import {
  buscarProximaClase,
  describirDia,
  estaVencida,
  fechaCorta,
  formatoHora,
  nombreDia
} from '../utils/fechas'

// Ícono que acompaña a cada tipo de material.
const ICONOS_MATERIAL = {
  pdf: '📄',
  enlace: '🔗',
  video: '🎬',
  lectura: '📖'
}

/**
 * Página principal de una materia.
 *
 * Se abre desde el botón "Continuar" del inicio y desde la
 * sección Clases.
 *
 * Distribución:
 * - Columna principal: introducción de la materia y, debajo,
 *   el horario con la próxima clase.
 * - Columna derecha: tareas y asignaciones, y materiales de apoyo.
 */
function CursoPagina() {

  const { id } = useParams()

  const { t, idioma, locale } = useAjustes()

  const resultado = useApi(`/cursos/${id}/`, idioma)

  const volver = (
    <Link to="/clases" className="volver-enlace">
      {t('volver_clases')}
    </Link>
  )

  if (resultado.cargando || resultado.error) {
    return (
      <main className="curso-pagina">

        {volver}

        <EstadoCarga
          cargando={resultado.cargando}
          error={false}
        />

        {resultado.error && (
          <div className="no-courses">
            <h3>{t('curso_no_encontrado')}</h3>
            <p>{t('curso_no_encontrado_sub')}</p>
          </div>
        )}

      </main>
    )
  }

  const curso = resultado.datos

  const ahora = new Date()

  // Próxima clase de esta materia según la fecha del dispositivo.
  const proxima = buscarProximaClase([curso], ahora)

  return (
    <main className="curso-pagina">

      {volver}

      {/* Encabezado de la materia */}
      <section className={`curso-banner color-${curso.color}`}>

        <span className="curso-banner-codigo">
          {curso.codigo}
        </span>

        <h1>{curso.nombre}</h1>

        <p>
          {t('profesor')}: {curso.profesor}
          {' · '}
          {t(`modalidad_${curso.modalidad}`)}
          {curso.aula ? ` · ${curso.aula}` : ''}
        </p>

      </section>

      <div className="curso-layout">

        {/* ---------- Columna principal ---------- */}
        <div className="curso-main">

          {/* Introducción a la materia */}
          <section className="curso-card">

            <h2>📗 {t('introduccion_curso')}</h2>

            <p>{curso.introduccion || curso.descripcion}</p>

            {curso.competencia && (
              <>
                <h2>🎯 {t('competencia_general')}</h2>

                <p className="curso-competencia">
                  {curso.competencia}
                </p>
              </>
            )}

          </section>

          {/* Horario y próxima clase */}
          <section className="curso-card">

            <h2>🕒 {t('proxima_clase_titulo')}</h2>

            {proxima ? (
              <div className="proxima-clase">

                <strong>
                  {describirDia(proxima.inicio, locale, t, ahora)}
                </strong>

                <span>
                  {formatoHora(proxima.horario.hora_inicio)}
                  {' - '}
                  {formatoHora(proxima.horario.hora_fin)}
                </span>

                {curso.aula && <small>{curso.aula}</small>}

              </div>
            ) : (
              <p>{t('sin_proxima_clase')}</p>
            )}

            <h3 className="curso-subtitulo">
              {t('horario_semanal')}
            </h3>

            <ul className="curso-horario">

              {curso.horarios.map((horario) => (

                <li
                  key={horario.id}
                  className={
                    proxima && proxima.horario.id === horario.id
                      ? 'horario-siguiente'
                      : ''
                  }
                >
                  <span>
                    {nombreDia(horario.dia_semana, locale)}
                  </span>

                  <span>
                    {formatoHora(horario.hora_inicio)}
                    {' - '}
                    {formatoHora(horario.hora_fin)}
                  </span>
                </li>

              ))}

            </ul>

          </section>

        </div>

        {/* ---------- Columna derecha ---------- */}
        <aside className="curso-side">

          {/* Tareas y asignaciones */}
          <section className="curso-card">

            <h2>📝 {t('tareas_asignaciones')}</h2>

            {curso.tareas.length === 0 ? (
              <p className="curso-vacio">
                {t('sin_tareas_curso')}
              </p>
            ) : (
              <ul className="curso-lista">

                {curso.tareas.map((tarea) => {

                  const vencida = estaVencida(tarea, ahora)

                  return (
                    <li key={tarea.id}>

                      <Link to={`/tareas/${tarea.id}`}>

                        <span className="curso-lista-titulo">
                          {tarea.titulo}
                        </span>

                        <span
                          className={`curso-lista-fecha ${
                            vencida ? 'estado-vencida' : ''
                          }`}
                        >
                          {vencida
                            ? t('vencida')
                            : t('vence', {
                                fecha: fechaCorta(
                                  tarea.fecha_entrega,
                                  locale
                                )
                              })}
                        </span>

                      </Link>

                    </li>
                  )
                })}

              </ul>
            )}

          </section>

          {/* Materiales de apoyo */}
          <section className="curso-card">

            <h2>📚 {t('materiales_apoyo')}</h2>

            {curso.materiales.length === 0 ? (
              <p className="curso-vacio">
                {t('sin_materiales')}
              </p>
            ) : (
              <ul className="curso-lista">

                {curso.materiales.map((material) => {

                  const contenido = (
                    <>
                      <span className="material-icono">
                        {ICONOS_MATERIAL[material.tipo] || '📄'}
                      </span>

                      <span className="material-info">
                        <span className="curso-lista-titulo">
                          {material.titulo}
                        </span>

                        <span className="curso-lista-fecha">
                          {t(`material_tipo_${material.tipo}`)}
                        </span>
                      </span>
                    </>
                  )

                  return (
                    <li key={material.id}>

                      {material.url ? (
                        <a
                          className="material-enlace"
                          href={material.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {contenido}
                        </a>
                      ) : (
                        <div className="curso-lista-sin-enlace">
                          {contenido}
                        </div>
                      )}

                    </li>
                  )
                })}

              </ul>
            )}

          </section>

        </aside>

      </div>

    </main>
  )
}

export default CursoPagina
