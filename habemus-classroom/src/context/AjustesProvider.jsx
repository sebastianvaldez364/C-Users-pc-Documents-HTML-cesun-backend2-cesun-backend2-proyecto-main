import { useCallback, useEffect, useMemo, useState } from 'react'

import { AjustesContext } from './ajustes'
import { LOCALES, traducir } from '../i18n/textos'

/**
 * Claves con las que se guardan los ajustes en el navegador.
 * Así se conservan aunque se cierre la página.
 */
const CLAVE_IDIOMA = 'habemus.idioma'
const CLAVE_TEMA = 'habemus.tema'
const CLAVE_DALTONISMO = 'habemus.daltonismo'

function leer(clave) {
  try {
    return localStorage.getItem(clave)
  } catch {
    // El navegador puede bloquear el almacenamiento local.
    return null
  }
}

function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, valor)
  } catch {
    // Si no se puede guardar, el ajuste solo dura esta sesión.
  }
}

/**
 * Proveedor de ajustes de Habemus Classroom.
 *
 * - Idioma: al cambiarlo se guarda y la página se recarga
 *   para que todos los textos se actualicen.
 * - Modo noche: agrega data-theme="dark" al elemento <html>.
 * - Daltonismo: agrega data-cb="on" al elemento <html>.
 *
 * Los colores de cada combinación están en src/index.css.
 */
export function AjustesProvider({ children }) {

  // El idioma solo cambia al recargar la página.
  const [idioma] = useState(
    () => (leer(CLAVE_IDIOMA) === 'en' ? 'en' : 'es')
  )

  const [modoNoche, setModoNoche] = useState(
    () => leer(CLAVE_TEMA) === 'oscuro'
  )

  const [daltonismo, setDaltonismo] = useState(
    () => leer(CLAVE_DALTONISMO) === 'si'
  )

  // Aplica los ajustes al documento completo.
  useEffect(() => {

    const raiz = document.documentElement

    raiz.setAttribute('data-theme', modoNoche ? 'dark' : 'light')
    raiz.setAttribute('data-cb', daltonismo ? 'on' : 'off')
    raiz.lang = idioma

  }, [modoNoche, daltonismo, idioma])

  const t = useCallback(
    (clave, variables) => traducir(idioma, clave, variables),
    [idioma]
  )

  const cambiarIdioma = useCallback((nuevoIdioma) => {

    if (nuevoIdioma === idioma) {
      return
    }

    guardar(CLAVE_IDIOMA, nuevoIdioma)

    // Se recarga la página para actualizar todos los textos.
    window.location.reload()

  }, [idioma])

  const cambiarModoNoche = useCallback((activo) => {
    guardar(CLAVE_TEMA, activo ? 'oscuro' : 'claro')
    setModoNoche(activo)
  }, [])

  const cambiarDaltonismo = useCallback((activo) => {
    guardar(CLAVE_DALTONISMO, activo ? 'si' : 'no')
    setDaltonismo(activo)
  }, [])

  const valor = useMemo(() => ({
    idioma,
    locale: LOCALES[idioma],
    t,
    cambiarIdioma,
    modoNoche,
    cambiarModoNoche,
    daltonismo,
    cambiarDaltonismo
  }), [
    idioma,
    t,
    cambiarIdioma,
    modoNoche,
    cambiarModoNoche,
    daltonismo,
    cambiarDaltonismo
  ])

  return (
    <AjustesContext.Provider value={valor}>
      {children}
    </AjustesContext.Provider>
  )
}
