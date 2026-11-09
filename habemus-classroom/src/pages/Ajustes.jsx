import { useAjustes } from '../context/useAjustes'

/**
 * Página de Configuración.
 *
 * Permite cambiar:
 * - El idioma (español o inglés). Al elegirlo la página se
 *   recarga para actualizar todos los textos.
 * - El modo noche.
 * - Los colores para daltonismo (compatible con el modo noche).
 *
 * Los ajustes se guardan en el navegador.
 */
function Ajustes() {

  const {
    t,
    idioma,
    cambiarIdioma,
    modoNoche,
    cambiarModoNoche,
    daltonismo,
    cambiarDaltonismo
  } = useAjustes()

  return (
    <main className="ajustes-page">

      <section className="welcome">
        <h1>{t('ajustes_titulo')}</h1>
        <p>{t('ajustes_sub')}</p>
      </section>

      {/* ---------- Idioma ---------- */}
      <section className="ajustes-card">

        <div className="ajustes-texto">
          <h2>
            <label htmlFor="idioma">
              🌐 {t('ajustes_idioma')}
            </label>
          </h2>

          <p>{t('ajustes_idioma_desc')}</p>
        </div>

        <select
          id="idioma"
          className="ajustes-select"
          value={idioma}
          onChange={(event) => cambiarIdioma(event.target.value)}
        >
          <option value="es">{t('idioma_es')}</option>
          <option value="en">{t('idioma_en')}</option>
        </select>

      </section>

      {/* ---------- Apariencia ---------- */}
      <section className="ajustes-card ajustes-columna">

        <h2 className="ajustes-seccion">
          🎨 {t('ajustes_apariencia')}
        </h2>

        {/* Modo noche */}
        <div className="ajustes-fila">

          <div className="ajustes-texto">
            <h3>🌙 {t('ajustes_modo_noche')}</h3>
            <p>{t('ajustes_modo_noche_desc')}</p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={modoNoche}
            aria-label={t('ajustes_modo_noche')}
            className={`ajustes-switch ${
              modoNoche ? 'ajustes-switch-activo' : ''
            }`}
            onClick={() => cambiarModoNoche(!modoNoche)}
          >
            <span className="ajustes-switch-bolita"></span>

            <span className="ajustes-switch-texto">
              {modoNoche
                ? t('ajustes_activado')
                : t('ajustes_desactivado')}
            </span>
          </button>

        </div>

        {/* Daltonismo */}
        <div className="ajustes-fila">

          <div className="ajustes-texto">
            <h3>👁 {t('ajustes_daltonismo')}</h3>
            <p>{t('ajustes_daltonismo_desc')}</p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={daltonismo}
            aria-label={t('ajustes_daltonismo')}
            className={`ajustes-switch ${
              daltonismo ? 'ajustes-switch-activo' : ''
            }`}
            onClick={() => cambiarDaltonismo(!daltonismo)}
          >
            <span className="ajustes-switch-bolita"></span>

            <span className="ajustes-switch-texto">
              {daltonismo
                ? t('ajustes_activado')
                : t('ajustes_desactivado')}
            </span>
          </button>

        </div>

        {/* Vista previa de los colores de las materias */}
        <div className="ajustes-muestras">

          <span className="ajustes-muestras-titulo">
            {t('ajustes_vista_previa')}
          </span>

          <div>
            <span className="calendar-event event-azul ajustes-muestra">
              <span className="event-course">Desarrollo Web</span>
            </span>

            <span className="calendar-event event-morado ajustes-muestra">
              <span className="event-course">Base de Datos</span>
            </span>

            <span className="calendar-event event-verde ajustes-muestra">
              <span className="event-course">Redes</span>
            </span>
          </div>

        </div>

      </section>

    </main>
  )
}

export default Ajustes
