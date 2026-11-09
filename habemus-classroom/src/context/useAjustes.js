import { useContext } from 'react'

import { AjustesContext } from './ajustes'

/**
 * Hook para leer y cambiar los ajustes desde cualquier componente.
 *
 * Devuelve:
 * - idioma: 'es' o 'en'.
 * - locale: configuración regional para fechas (es-MX / en-US).
 * - t(clave, variables): traduce un texto.
 * - cambiarIdioma(idioma): guarda el idioma y recarga la página.
 * - modoNoche / cambiarModoNoche(valor).
 * - daltonismo / cambiarDaltonismo(valor).
 */
export function useAjustes() {

  const ajustes = useContext(AjustesContext)

  if (ajustes === null) {
    throw new Error(
      'useAjustes debe usarse dentro de AjustesProvider'
    )
  }

  return ajustes
}
