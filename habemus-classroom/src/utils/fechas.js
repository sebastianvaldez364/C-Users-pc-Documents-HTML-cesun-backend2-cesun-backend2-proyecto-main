/**
 * Funciones para trabajar con fechas y horarios.
 *
 * Todas usan la fecha y la hora del dispositivo del estudiante.
 * Los días de la semana siguen el formato del backend:
 * 0 = lunes, 1 = martes ... 6 = domingo.
 */

/** Agrega un cero a la izquierda: 5 -> "05". */
export function dosDigitos(numero) {
  return String(numero).padStart(2, '0')
}

/** Convierte una fecha en texto "AAAA-MM-DD" (sin zona horaria). */
export function fechaATexto(fecha) {
  return (
    `${fecha.getFullYear()}-` +
    `${dosDigitos(fecha.getMonth() + 1)}-` +
    `${dosDigitos(fecha.getDate())}`
  )
}

/** Recorta "09:00:00" a "09:00". */
export function formatoHora(hora) {
  return hora ? hora.substring(0, 5) : ''
}

/**
 * Crea una fecha local a partir de "AAAA-MM-DD" y "HH:MM:SS".
 */
export function crearFecha(fechaTexto, horaTexto = '00:00:00') {

  const [anio, mes, dia] = fechaTexto.split('-').map(Number)
  const [horas, minutos] = horaTexto.split(':').map(Number)

  return new Date(anio, mes - 1, dia, horas, minutos || 0)
}

/** Pone la primera letra en mayúscula. */
export function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

/** Nombre del día de la semana (0 = lunes) en el idioma elegido. */
export function nombreDia(indice, locale) {

  // El 1 de enero de 2024 fue lunes.
  const fecha = new Date(2024, 0, 1 + indice)

  return capitalizar(
    fecha.toLocaleDateString(locale, { weekday: 'long' })
  )
}

/** Nombre abreviado del día (LUN, MAR...) para el calendario. */
export function nombreDiaCorto(indice, locale) {

  const fecha = new Date(2024, 0, 1 + indice)

  return fecha
    .toLocaleDateString(locale, { weekday: 'short' })
    .replace('.', '')
    .toUpperCase()
}

/** Nombre del mes en el idioma elegido. */
export function nombreMes(anio, mes, locale) {
  return capitalizar(
    new Date(anio, mes, 1).toLocaleDateString(
      locale,
      { month: 'long' }
    )
  )
}

/** Fecha larga: "8 de octubre de 2026" / "October 8, 2026". */
export function fechaLarga(fechaTexto, locale) {

  if (!fechaTexto) {
    return ''
  }

  return crearFecha(fechaTexto).toLocaleDateString(
    locale,
    { day: 'numeric', month: 'long', year: 'numeric' }
  )
}

/** Fecha corta: "8 de octubre" / "October 8". */
export function fechaCorta(fechaTexto, locale) {

  if (!fechaTexto) {
    return ''
  }

  return crearFecha(fechaTexto).toLocaleDateString(
    locale,
    { day: 'numeric', month: 'long' }
  )
}

/**
 * Número de días del mes y espacios vacíos antes del día 1.
 * El calendario empieza en lunes.
 */
export function datosDelMes(anio, mes) {

  const diasDelMes = new Date(anio, mes + 1, 0).getDate()

  // getDay(): 0 = domingo. Se convierte para que 0 = lunes.
  const primerDia = (new Date(anio, mes, 1).getDay() + 6) % 7

  return { diasDelMes, espaciosIniciales: primerDia }
}

/** Indica si una tarea ya pasó su fecha de entrega. */
export function estaVencida(tarea, ahora = new Date()) {
  return crearFecha(
    tarea.fecha_entrega,
    tarea.hora_entrega
  ) < ahora
}

/** Prepara una tarea que viene de Django para mostrarla. */
export function adaptarTarea(tarea) {

  return {
    ...tarea,

    hora: formatoHora(tarea.hora_entrega),

    listaInstrucciones: tarea.instrucciones
      ? tarea.instrucciones
          .split('\n')
          .filter((linea) => linea.trim() !== '')
      : []
  }
}

/**
 * Busca la próxima clase a partir de la fecha y hora actuales.
 *
 * Recibe una lista de cursos con sus horarios y devuelve:
 * { curso, horario, inicio, fin }
 * o null si no hay clases programadas.
 *
 * Una clase que está en curso todavía cuenta como "próxima".
 */
export function buscarProximaClase(cursos, ahora = new Date()) {

  let mejor = null

  // Índice del día actual con lunes = 0.
  const hoy = (ahora.getDay() + 6) % 7

  for (const curso of cursos) {

    for (const horario of curso.horarios) {

      // Días que faltan para el siguiente día de esa clase.
      for (let salto = 0; salto <= 7; salto++) {

        if ((hoy + salto) % 7 !== horario.dia_semana) {
          continue
        }

        const [hi, mi] = horario.hora_inicio.split(':').map(Number)
        const [hf, mf] = horario.hora_fin.split(':').map(Number)

        const inicio = new Date(
          ahora.getFullYear(),
          ahora.getMonth(),
          ahora.getDate() + salto,
          hi,
          mi
        )

        const fin = new Date(
          ahora.getFullYear(),
          ahora.getMonth(),
          ahora.getDate() + salto,
          hf,
          mf
        )

        if (fin > ahora && (!mejor || inicio < mejor.inicio)) {
          mejor = { curso, horario, inicio, fin }
        }

        break
      }
    }
  }

  return mejor
}

/**
 * Describe cuándo ocurre una fecha respecto a hoy:
 * "Hoy", "Mañana" o el nombre del día con la fecha.
 */
export function describirDia(fecha, locale, t, ahora = new Date()) {

  const inicioHoy = new Date(
    ahora.getFullYear(),
    ahora.getMonth(),
    ahora.getDate()
  )

  const inicioFecha = new Date(
    fecha.getFullYear(),
    fecha.getMonth(),
    fecha.getDate()
  )

  const dias = Math.round(
    (inicioFecha - inicioHoy) / (24 * 60 * 60 * 1000)
  )

  if (dias === 0) {
    return t('hoy')
  }

  if (dias === 1) {
    return t('manana')
  }

  return capitalizar(
    fecha.toLocaleDateString(
      locale,
      { weekday: 'long', day: 'numeric', month: 'short' }
    )
  )
}
