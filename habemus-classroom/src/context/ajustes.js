import { createContext } from 'react'

/**
 * Contexto con los ajustes del estudiante:
 * idioma, modo noche y colores para daltonismo.
 *
 * Se consume con el hook useAjustes().
 */
export const AjustesContext = createContext(null)
