import { useState } from 'react'
import { Link } from 'react-router-dom'

import EstadoCarga from '../components/EstadoCarga'
import { useAjustes } from '../context/useAjustes'
import { useApi } from '../hooks/useApi'
import {
  adaptarTarea,
  datosDelMes,
  dosDigitos,
  fechaLarga,
  nombreDiaCorto,
  nombreMes
} from '../utils/fechas'

// Clase CSS del punto de color de la leyenda según el color del curso.
const PUNTO_LEYENDA = {
  azul: 'legend-blue',
  morado: 'legend-purple',
  verde: 'legend-green'
}

/**
 * Página de Tareas de Habemus Classroom.
 *
 * Muestra un calendario mensual con las tareas obtenidas desde
 * el backend de Django.
 *
 * El calendario se abre en el mes actual según la fecha del
 * dispositivo y permite navegar entre meses.
 */
function Tareas() {

  const { t, idioma, locale } = useAjustes()

  const resultadoTareas = useApi('/tareas/', idioma)
  const resultadoCursos = useApi('/cursos/', idioma)

  // Las tareas se adaptan para mostrarlas (hora e instrucciones).
  const tareas = (resultadoTareas.datos || []).map(adaptarTarea)

  const cursosLeyenda = resultadoCursos.datos || []

  // Curso elegido en el filtro ("todos" muestra todo).
  const [cursoSeleccionado, setCursoSeleccionado] = useState('todos')

  // Tarea abierta en el panel lateral.
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null)

  /*
   * Mes que muestra el calendario.
   *
   * Empieza en el mes de la fecha actual del dispositivo.
   * mes va de 0 (enero) a 11 (diciembre).
   */
  const [vista, setVista] = useState(() => {
    const hoy = new Date()

    return {
      anio: hoy.getFullYear(),
      mes: hoy.getMonth()
    }
  })

  const hoy = new Date()

  const { anio, mes } = vista

  const { diasDelMes, espaciosIniciales } = datosDelMes(anio, mes)

  const dias = Array.from(
    { length: diasDelMes },
    (_, indice) => indice + 1
  )

  // Nombres de las materias que tienen tareas, para el filtro.
  const cursos = [...new Set(tareas.map((tarea) => tarea.curso))]

  const tareasFiltradas =
    cursoSeleccionado === 'todos'
      ? tareas
      : tareas.filter((tarea) => tarea.curso === cursoSeleccionado)

  /*
   * Busca las tareas de un día del mes que se está viendo.
   *
   * Se compara la fecha completa (año, mes y día), no solo el
   * número del día, para que una tarea de otro mes no aparezca
   * en esta cuadrícula.
   */
  const obtenerTareasDelDia = (dia) => {

    const fecha = `${anio}-${dosDigitos(mes + 1)}-${dosDigitos(dia)}`

    return tareasFiltradas.filter(
      (tarea) => tarea.fecha_entrega === fecha
    )
  }

  const esHoy = (dia) =>
    anio === hoy.getFullYear() &&
    mes === hoy.getMonth() &&
    dia === hoy.getDate()

  // Cambia el mes que se muestra (-1 anterior, +1 siguiente).
  const moverMes = (cambio) => {
    const fecha = new Date(anio, mes + cambio, 1)

    setVista({
      anio: fecha.getFullYear(),
      mes: fecha.getMonth()
    })
  }

  const irAlMesActual = () => {
    setVista({
      anio: hoy.getFullYear(),
      mes: hoy.getMonth()
    })
  }

  const estaEnMesActual =
    anio === hoy.getFullYear() && mes === hoy.getMonth()

  const abrirTarea = (tarea) => {
    setTareaSeleccionada(tarea)
  }

  const cerrarTarea = () => {
    setTareaSeleccionada(null)
  }

  return (
    <main className="tareas-page">

      {/* ENCABEZADO DE LA PÁGINA */}
      <section className="tareas-top">

        <div>
          <span className="tareas-label">
            {t('tareas_organizacion')}
          </span>

          <h1>{t('mis_tareas')}</h1>

          <p>{t('tareas_sub')}</p>
        </div>

        {/* FILTRO DE MATERIAS */}
        <div className="tareas-filter">

          <label htmlFor="curso">
            {t('mostrar')}
          </label>

          <select
            id="curso"
            value={cursoSeleccionado}
            onChange={(event) =>
              setCursoSeleccionado(event.target.value)
            }
          >
            <option value="todos">
              {t('todos_los_cursos')}
            </option>

            {cursos.map((curso) => (
              <option key={curso} value={curso}>
                {curso}
              </option>
            ))}
          </select>

        </div>

      </section>

      {/* ESTADO DE LA CONEXIÓN CON DJANGO */}
      {resultadoTareas.cargando && (
        <div className="backend-message">
          {t('cargando_tareas')}
        </div>
      )}

      {resultadoTareas.error && (
        <div className="backend-error">
          {t('error_conexion')}
        </div>
      )}

      {/* TARJETA DEL CALENDARIO */}
      <section className="habemus-calendar">

        {/* NAVEGACIÓN DEL CALENDARIO */}
        <div className="calendar-navigation">

          <button
            type="button"
            className="month-button"
            aria-label={t('mes_anterior')}
            onClick={() => moverMes(-1)}
          >
            ‹
          </button>

          <div className="calendar-current-month">

            <span>{t('calendario')}</span>

            <h2>
              {nombreMes(anio, mes, locale)} {anio}
            </h2>

            {/* Solo aparece cuando se está viendo otro mes */}
            {!estaEnMesActual && (
              <button
                type="button"
                className="calendar-today-button"
                onClick={irAlMesActual}
              >
                {t('ir_a_hoy')}
              </button>
            )}

          </div>

          <button
            type="button"
            className="month-button"
            aria-label={t('mes_siguiente')}
            onClick={() => moverMes(1)}
          >
            ›
          </button>

        </div>

        {/* NOMBRES DE LOS DÍAS (lunes a domingo) */}
        <div className="calendar-week">
          {[0, 1, 2, 3, 4, 5, 6].map((indice) => (
            <div key={indice}>
              {nombreDiaCorto(indice, locale)}
            </div>
          ))}
        </div>

        {/* CASILLAS DEL CALENDARIO */}
        <div className="calendar-boxes">

          {Array.from({ length: espaciosIniciales }).map((_, index) => (
            <div
              className="calendar-box calendar-box-empty"
              key={`empty-${index}`}
            />
          ))}

          {/* GENERACIÓN DE LOS DÍAS */}
          {dias.map((dia) => {

            const tareasDelDia = obtenerTareasDelDia(dia)

            return (
              <div
                className={`calendar-box ${
                  tareasDelDia.length > 0
                    ? 'calendar-box-with-task'
                    : ''
                } ${esHoy(dia) ? 'calendar-box-today' : ''}`}
                key={dia}
              >

                <div className="calendar-box-header">

                  <span
                    className={`calendar-number ${
                      esHoy(dia) ? 'calendar-number-today' : ''
                    }`}
                  >
                    {dia}
                  </span>

                  {tareasDelDia.length > 0 && (
                    <span className="task-count">
                      {tareasDelDia.length}
                    </span>
                  )}

                </div>

                {/* TAREAS DEL DÍA */}
                <div className="calendar-box-tasks">

                  {tareasDelDia.map((tarea) => (
                    <button
                      type="button"
                      className={`calendar-event event-${tarea.color}`}
                      key={tarea.id}
                      onClick={() => abrirTarea(tarea)}
                    >
                      <span className="event-course">
                        {tarea.curso}
                      </span>

                      <span className="event-title">
                        {tarea.titulo}
                      </span>

                      <span className="event-time">
                        {tarea.hora}
                      </span>
                    </button>
                  ))}

                </div>

              </div>
            )
          })}

        </div>

      </section>

      {/* LEYENDA DE MATERIAS */}
      <section className="calendar-legend">

        {cursosLeyenda.map((curso) => (
          <div key={curso.id}>
            <span
              className={`legend-dot ${PUNTO_LEYENDA[curso.color] || 'legend-blue'}`}
            ></span>
            {curso.nombre}
          </div>
        ))}

      </section>

      {/* FONDO DEL PANEL */}
      {tareaSeleccionada && (
        <div
          className="task-overlay"
          onClick={cerrarTarea}
        />
      )}

      {/* PANEL DE DETALLES DE LA TAREA */}
      {tareaSeleccionada && (
        <aside className="task-panel">

          {/* MATERIA */}
          <div className="task-course">
            <span>{t('materia')}</span>
            <h3>{tareaSeleccionada.curso}</h3>
          </div>

          {/* ENCABEZADO DE LA ACTIVIDAD */}
          <div className="task-panel-header">

            <div>
              <span className="task-type">
                {t('actividad')}
              </span>

              <h2>{tareaSeleccionada.titulo}</h2>
            </div>

            <button
              type="button"
              className="close-task"
              onClick={cerrarTarea}
              aria-label={t('cerrar_tarea')}
            >
              ×
            </button>

          </div>

          {/* INFORMACIÓN DE LA TAREA */}
          <div className="task-panel-content">

            <div className="task-date-card">

              <div className="task-date-icon">◷</div>

              <div>
                <span>{t('fecha_entrega')}</span>

                <strong>
                  {fechaLarga(tareaSeleccionada.fecha_entrega, locale)}
                </strong>

                <p>{tareaSeleccionada.hora}</p>
              </div>

            </div>

            <div className="task-information">
              <h3>{t('descripcion')}</h3>
              <p>{tareaSeleccionada.descripcion}</p>
            </div>

            <div className="task-information">
              <h3>{t('instrucciones')}</h3>

              <ul>
                {tareaSeleccionada.listaInstrucciones.map(
                  (instruccion, index) => (
                    <li key={index}>{instruccion}</li>
                  )
                )}
              </ul>
            </div>

          </div>

          {/* PIE DEL PANEL: abre la página completa de la tarea */}
          <div className="task-panel-footer">
            <Link to={`/tareas/${tareaSeleccionada.id}`}>
              {t('ir_actividad')}
            </Link>
          </div>

        </aside>
      )}

    </main>
  )
}

export default Tareas
