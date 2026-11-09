import { useAjustes } from '../context/useAjustes'

/**
 * Mensaje de estado de la conexión con Django.
 *
 * - cargando: muestra "Cargando...".
 * - error: muestra el mensaje de error de conexión.
 *
 * Si no hay ninguno de los dos no muestra nada.
 */
function EstadoCarga({ cargando, error }) {

  const { t } = useAjustes()

  if (error) {
    return (
      <div className="backend-error" role="alert">
        {t('error_conexion')}
      </div>
    )
  }

  if (cargando) {
    return (
      <div className="backend-message" role="status">
        {t('cargando')}
      </div>
    )
  }

  return null
}

export default EstadoCarga
