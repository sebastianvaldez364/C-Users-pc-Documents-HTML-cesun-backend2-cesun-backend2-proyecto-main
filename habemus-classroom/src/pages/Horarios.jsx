import EstadoCarga from '../components/EstadoCarga'
import { useAjustes } from '../context/useAjustes'
import { useApi } from '../hooks/useApi'
import { formatoHora, nombreDia } from '../utils/fechas'

/**
 * Página de Horarios de Habemus Classroom.
 *
 * Permite visualizar las clases programadas
 * durante la semana.
 *
 * Los horarios se obtienen desde el backend de Django
 * (los mismos que se muestran en la página de cada materia).
 */
function Horarios() {

  const { t, idioma, locale } = useAjustes()

  const cursos = useApi('/cursos/', idioma)

  // Se juntan los horarios de todos los cursos en una sola lista.
  const horarios = (cursos.datos || []).flatMap((curso) =>
    curso.horarios.map((horario) => ({
      id: `${curso.id}-${horario.id}`,
      materia: curso.nombre,
      profesor: curso.profesor,
      dia: horario.dia_semana,
      inicio: formatoHora(horario.hora_inicio),
      fin: formatoHora(horario.hora_fin)
    }))
  )

  // Días que se mostrarán en el horario semanal (lunes a viernes).
  const dias = [0, 1, 2, 3, 4]

  return (
    <main className="horarios-page">

      {/* Encabezado de la página */}
      <section className="welcome">
        <h1>{t('horarios_titulo')}</h1>
        <p>{t('horarios_sub')}</p>
      </section>

      <EstadoCarga
        cargando={cursos.cargando}
        error={cursos.error}
      />

      {/* Contenedor de los días de la semana */}
      <section className="horarios-grid">

        {dias.map((dia) => (

          <div className="horario-dia" key={dia}>

            {/* Nombre del día */}
            <h2>{nombreDia(dia, locale)}</h2>

            {/* Filtramos las clases correspondientes al día */}
            {horarios
              .filter((clase) => clase.dia === dia)
              .sort((a, b) => a.inicio.localeCompare(b.inicio))
              .map((clase) => (

                <div
                  className="horario-clase"
                  key={clase.id}
                >

                  <h3>{clase.materia}</h3>

                  <p>{clase.profesor}</p>

                  <span>
                    {clase.inicio} - {clase.fin}
                  </span>

                </div>

              ))}

          </div>

        ))}

      </section>

    </main>
  )
}

export default Horarios
