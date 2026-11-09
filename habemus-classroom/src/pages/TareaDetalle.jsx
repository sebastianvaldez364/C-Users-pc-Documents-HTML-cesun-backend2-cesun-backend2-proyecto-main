import { Link, useParams } from 'react-router-dom'

import EstadoCarga from '../components/EstadoCarga'
import { useAjustes } from '../context/useAjustes'
import { useApi } from '../hooks/useApi'
import {
  adaptarTarea,
  estaVencida,
  fechaLarga
} from '../utils/fechas'

/**
 * Página completa de una tarea (asignación).
 *
 * Muestra el título, la materia, la fecha de entrega, la
 * descripción, las instrucciones y una barra para subir archivos.
 *
 * Por ahora la barra de archivos solo forma parte de la interfaz:
 * todavía no permite subir archivos.
 */
function TareaDetalle() {

  const { id } = useParams()

  const { t, idioma, locale } = useAjustes()

  const resultado = useApi(`/tareas/${id}/`, idioma)

  const volver = (
    <Link to="/tareas" className="volver-enlace">
      {t('volver_tareas')}
    </Link>
  )

  // Mientras carga o si Django devuelve un error.
  if (resultado.cargando || resultado.error) {
    return (
      <main className="detalle-page">

        {volver}

        <EstadoCarga
          cargando={resultado.cargando}
          error={false}
        />

        {resultado.error && (
          <div className="no-courses">
            <h3>{t('tarea_no_encontrada')}</h3>
            <p>{t('tarea_no_encontrada_sub')}</p>
          </div>
        )}

      </main>
    )
  }

  const tarea = adaptarTarea(resultado.datos)

  const vencida = estaVencida(tarea)

  return (
    <main className="detalle-page">

      {volver}

      {/* Encabezado con materia, título y fecha de entrega */}
      <section className={`detalle-header event-${tarea.color}`}>

        <span className="detalle-materia">
          {tarea.curso}
        </span>

        <h1>{tarea.titulo}</h1>

        <div className="detalle-meta">

          <div>
            <span>{t('fecha_entrega')}</span>

            <strong>
              {fechaLarga(tarea.fecha_entrega, locale)}
              {' · '}
              {tarea.hora}
            </strong>
          </div>

          <div>
            <span>{t('estado_tarea')}</span>

            <strong
              className={vencida ? 'estado-vencida' : 'estado-pendiente'}
            >
              {vencida
                ? t('estado_vencida')
                : t('estado_pendiente')}
            </strong>
          </div>

        </div>

      </section>

      {/* Descripción e instrucciones */}
      <section className="detalle-card">

        <h2>{t('descripcion')}</h2>

        <p>{tarea.descripcion}</p>

        <h2>{t('instrucciones')}</h2>

        <ol className="detalle-instrucciones">
          {tarea.listaInstrucciones.map((instruccion, index) => (
            <li key={index}>{instruccion}</li>
          ))}
        </ol>

      </section>

      {/* Barra para subir archivos (todavía sin funcionamiento) */}
      <section className="detalle-card">

        <h2>{t('entrega_archivos')}</h2>

        <div className="subida-archivos" aria-disabled="true">

          <div className="subida-icono">⬆</div>

          <p className="subida-texto">
            {t('subir_arrastra')}
          </p>

          <span className="subida-o">{t('subir_o')}</span>

          <label className="subida-boton" aria-disabled="true">
            {t('subir_seleccionar')}

            <input type="file" disabled />
          </label>

        </div>

        <p className="subida-nota">
          {t('subir_proximamente')}
        </p>

        <button
          type="button"
          className="detalle-entregar"
          disabled
        >
          {t('subir_boton')}
        </button>

      </section>

    </main>
  )
}

export default TareaDetalle
