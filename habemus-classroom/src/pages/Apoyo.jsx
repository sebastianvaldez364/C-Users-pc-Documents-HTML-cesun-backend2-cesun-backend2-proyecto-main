import { useState } from 'react'

import EstadoCarga from '../components/EstadoCarga'
import { useAjustes } from '../context/useAjustes'
import { useApi } from '../hooks/useApi'

/**
 * Página de Apoyo.
 *
 * Muestra clases y cursos de dos categorías:
 * - Materias: refuerzo de los temas de las materias.
 * - Accesibilidad e inclusión: manejo de discapacidades, por
 *   ejemplo una clase para estudiantes con dificultades para
 *   comunicarse.
 *
 * La información viene del backend (/api/apoyo/).
 */
function Apoyo() {

  const { t, idioma } = useAjustes()

  const resultado = useApi('/apoyo/', idioma)

  // Filtros de la página.
  const [categoria, setCategoria] = useState('todos')
  const [tipo, setTipo] = useState('todos')

  const recursos = (resultado.datos || []).filter((recurso) =>
    (categoria === 'todos' || recurso.categoria === categoria) &&
    (tipo === 'todos' || recurso.tipo === tipo)
  )

  const categorias = [
    ['todos', t('apoyo_todos')],
    ['materias', t('apoyo_materias')],
    ['accesibilidad', t('apoyo_accesibilidad')]
  ]

  return (
    <main className="apoyo-page">

      <section className="welcome">
        <h1>{t('apoyo_titulo')}</h1>
        <p>{t('apoyo_sub')}</p>
      </section>

      {/* Filtros por categoría y por tipo */}
      <section className="apoyo-tools">

        <div className="apoyo-tabs" role="group">

          {categorias.map(([valor, texto]) => (
            <button
              type="button"
              key={valor}
              className={`apoyo-tab ${
                categoria === valor ? 'apoyo-tab-activa' : ''
              }`}
              aria-pressed={categoria === valor}
              onClick={() => setCategoria(valor)}
            >
              {texto}
            </button>
          ))}

        </div>

        <select
          value={tipo}
          aria-label={t('apoyo_tipo')}
          onChange={(event) => setTipo(event.target.value)}
        >
          <option value="todos">{t('apoyo_tipo_todos')}</option>
          <option value="clase">{t('apoyo_tipo_clase')}</option>
          <option value="curso">{t('apoyo_tipo_curso')}</option>
        </select>

      </section>

      {categoria === 'accesibilidad' && (
        <div className="backend-message">
          {t('apoyo_nota_accesibilidad')}
        </div>
      )}

      <EstadoCarga
        cargando={resultado.cargando}
        error={resultado.error}
      />

      <section className="apoyo-grid">

        {recursos.map((recurso) => (

          <article
            className={`apoyo-card apoyo-${recurso.categoria}`}
            key={recurso.id}
          >

            <div className="apoyo-card-top">

              <span className="apoyo-badge">
                {recurso.tipo === 'clase'
                  ? t('recurso_clase')
                  : t('recurso_curso')}
              </span>

              <span className="apoyo-categoria">
                {recurso.categoria === 'accesibilidad'
                  ? t('apoyo_accesibilidad')
                  : t('apoyo_materias')}
              </span>

            </div>

            <h2>{recurso.titulo}</h2>

            <p className="apoyo-descripcion">
              {recurso.descripcion}
            </p>

            <dl className="apoyo-datos">

              {recurso.dirigido_a && (
                <div>
                  <dt>{t('dirigido_a')}</dt>
                  <dd>{recurso.dirigido_a}</dd>
                </div>
              )}

              {recurso.duracion && (
                <div>
                  <dt>{t('duracion')}</dt>
                  <dd>{recurso.duracion}</dd>
                </div>
              )}

              {recurso.materia && (
                <div>
                  <dt>{t('materia_relacionada')}</dt>
                  <dd>{recurso.materia}</dd>
                </div>
              )}

            </dl>

            {recurso.url && (
              <a
                className="apoyo-enlace"
                href={recurso.url}
                target="_blank"
                rel="noreferrer"
              >
                {t('abrir_recurso')}
              </a>
            )}

          </article>

        ))}

      </section>

      {!resultado.cargando &&
        !resultado.error &&
        recursos.length === 0 && (
        <div className="no-courses">
          <h3>{t('apoyo_vacio')}</h3>
        </div>
      )}

    </main>
  )
}

export default Apoyo
