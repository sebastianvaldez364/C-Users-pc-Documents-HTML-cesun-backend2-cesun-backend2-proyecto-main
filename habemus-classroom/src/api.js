/**
 * Dirección base de la API de Django.
 *
 * Se puede cambiar creando un archivo .env en la carpeta
 * habemus-classroom con:
 *
 *   VITE_API_URL=http://127.0.0.1:8000/api
 */
export const API_URL =
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
