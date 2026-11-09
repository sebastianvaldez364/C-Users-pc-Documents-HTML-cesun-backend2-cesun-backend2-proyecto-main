import { useEffect, useState } from 'react'
import { API_URL } from '../api'

export function useApi(ruta, idioma) {
  const separador = ruta.includes('?') ? '&' : '?'
  const url = `${API_URL}${ruta}${separador}lang=${idioma}`

  const [respuesta, setRespuesta] = useState({
    url: null,
    datos: null,
    error: false
  })

  useEffect(() => {
    let cancelado = false
    const token = localStorage.getItem('habemus.token')

    fetch(url, {
      headers: token ? { Authorization: `Token ${token}` } : {}
    })
      .then((resultado) => {
        if (!resultado.ok) throw new Error(`Error ${resultado.status}`)
        return resultado.json()
      })
      .then((datos) => {
        if (!cancelado) setRespuesta({ url, datos, error: false })
      })
      .catch((error) => {
        console.error('Error al conectar con Django:', error)
        if (!cancelado) setRespuesta({ url, datos: null, error: true })
      })

    return () => { cancelado = true }
  }, [url])

  const listo = respuesta.url === url

  return {
    datos: listo ? respuesta.datos : null,
    cargando: !listo,
    error: listo && respuesta.error
  }
}
