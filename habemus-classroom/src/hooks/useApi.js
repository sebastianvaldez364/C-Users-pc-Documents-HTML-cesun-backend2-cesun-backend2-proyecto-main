import { useEffect, useState } from 'react'

import { API_URL } from '../api'

/**
 * Hook para consultar la API de Django.
 *
 * Agrega automáticamente el idioma elegido (?lang=es o ?lang=en)
 * para que el backend devuelva los textos traducidos.
 *
 * Ejemplo:
 *
 *   const { datos, cargando, error } = useApi('/cursos/', idioma)
 *
 * Devuelve:
 * - datos: respuesta JSON (null mientras carga o si hay error).
 * - cargando: true mientras se espera la respuesta.
 * - error: true si Django no respondió correctamente.
 */
export function useApi(ruta, idioma) {

  const separador = ruta.includes('?') ? '&' : '?'

  const url = `${API_URL}${ruta}${separador}lang=${idioma}`

  // Se guarda la url junto con la respuesta para saber
  // si la respuesta pertenece a la petición actual.
  const [respuesta, setRespuesta] = useState({
    url: null,
    datos: null,
    error: false
  })

  useEffect(() => {

    let cancelado = false

    fetch(url)
      .then((resultado) => {

        if (!resultado.ok) {
          throw new Error(`Error ${resultado.status}`)
        }

        return resultado.json()
      })
      .then((datos) => {
        if (!cancelado) {
          setRespuesta({ url, datos, error: false })
        }
      })
      .catch((error) => {
        console.error('Error al conectar con Django:', error)

        if (!cancelado) {
          setRespuesta({ url, datos: null, error: true })
        }
      })

    return () => {
      cancelado = true
    }

  }, [url])

  const listo = respuesta.url === url

  return {
    datos: listo ? respuesta.datos : null,
    cargando: !listo,
    error: listo && respuesta.error
  }
}
