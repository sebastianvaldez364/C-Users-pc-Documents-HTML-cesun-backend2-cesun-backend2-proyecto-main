/**
 * Textos de Habemus Classroom en español e inglés.
 *
 * Cada clave existe en los dos idiomas. Para usar un texto
 * en un componente se llama a la función t():
 *
 *   const { t } = useAjustes()
 *   <h1>{t('mis_tareas')}</h1>
 *
 * Los textos con {variables} reciben valores así:
 *
 *   t('entrega', { fecha: '8 de octubre' })
 */

export const IDIOMAS = ['es', 'en']

// Configuración regional usada para dar formato a fechas.
export const LOCALES = {
  es: 'es-MX',
  en: 'en-US'
}

const es = {

  // ---------- Navegación ----------
  nav_inicio: 'Inicio',
  nav_horarios: 'Horarios',
  nav_clases: 'Clases',
  nav_cursos: 'Cursos',
  nav_tareas: 'Tareas',
  nav_apoyo: 'Apoyo',

  // ---------- Perfil ----------
  perfil_abrir: 'Abrir menú de perfil',
  perfil_estudiante: 'Estudiante',
  perfil_mi_perfil: 'Mi perfil',
  perfil_configuracion: 'Configuración',
  perfil_accesibilidad: 'Accesibilidad',
  perfil_cerrar_sesion: 'Cerrar sesión',

  // ---------- General ----------
  cargando: 'Cargando...',
  error_conexion: 'No fue posible conectar con el servidor de Django.',
  profesor: 'Profesor',
  progreso: 'Progreso',
  horario: 'Horario',
  modalidad: 'Modalidad',
  aula: 'Aula',
  hoy: 'Hoy',
  manana: 'Mañana',
  modalidad_presencial: 'Presencial',
  modalidad_en_linea: 'En línea',

  // ---------- Inicio ----------
  saludo_manana: 'Buenos días, {nombre}',
  saludo_tarde: 'Buenas tardes, {nombre}',
  saludo_noche: 'Buenas noches, {nombre}',
  home_resumen: 'Aquí tienes un resumen de tus actividades.',
  proxima_clase: 'PRÓXIMA CLASE',
  sin_proxima_clase: 'Sin clases programadas',
  ver_clase: 'Ver clase →',
  tarea_pendiente: 'TAREA PENDIENTE',
  sin_tareas_pendientes: 'No tienes tareas pendientes',
  entrega: 'Entrega: {fecha}',
  ver_tarea: 'Ver tarea →',
  mis_cursos: 'Mis cursos',
  ver_todos: 'Ver todos →',
  curso_etiqueta: 'CURSO',
  continuar: 'Continuar',

  // ---------- Clases ----------
  clases_titulo: 'Mis clases',
  clases_sub: 'Consulta tus clases y accede al contenido de cada materia.',
  clase_etiqueta: 'CLASE',

  // ---------- Cursos ----------
  cursos_titulo: 'Mis cursos',
  cursos_sub: 'Consulta todos tus cursos y continúa con tu aprendizaje.',
  buscar_curso: 'Buscar curso...',
  ordenar_nombre: 'Ordenar por nombre',
  ordenar_progreso: 'Ordenar por progreso',
  entrar_curso: 'Entrar al curso',
  sin_cursos: 'No se encontraron cursos',
  sin_cursos_sub: 'Intenta realizar una búsqueda diferente.',

  // ---------- Horarios ----------
  horarios_titulo: 'Mi horario de clases',
  horarios_sub: 'Consulta tus clases y organiza tu semana.',

  // ---------- Tareas ----------
  tareas_organizacion: 'ORGANIZACIÓN',
  mis_tareas: 'Mis tareas',
  tareas_sub: 'Consulta tus actividades y próximas fechas de entrega.',
  mostrar: 'Mostrar',
  todos_los_cursos: 'Todos los cursos',
  cargando_tareas: 'Cargando tareas desde Django...',
  calendario: 'CALENDARIO',
  mes_anterior: 'Mes anterior',
  mes_siguiente: 'Mes siguiente',
  ir_a_hoy: 'Ir al mes actual',
  materia: 'MATERIA',
  actividad: 'ACTIVIDAD',
  fecha_entrega: 'FECHA DE ENTREGA',
  descripcion: 'Descripción',
  instrucciones: 'Instrucciones',
  ir_actividad: 'Ir a la actividad →',
  cerrar_tarea: 'Cerrar tarea',

  // ---------- Detalle de tarea ----------
  volver_tareas: '← Volver a tareas',
  tarea_no_encontrada: 'No se encontró la tarea',
  tarea_no_encontrada_sub: 'Es posible que haya sido eliminada, que el enlace sea incorrecto o que el servidor de Django no esté activo.',
  estado_tarea: 'Estado',
  estado_pendiente: 'Pendiente',
  estado_vencida: 'Vencida',
  entrega_archivos: 'Entrega de archivos',
  subir_arrastra: 'Arrastra un archivo aquí',
  subir_o: 'o',
  subir_seleccionar: 'Seleccionar archivo',
  subir_proximamente: 'La entrega de archivos estará disponible próximamente.',
  subir_boton: 'Entregar tarea',

  // ---------- Página de la materia ----------
  volver_clases: '← Volver a clases',
  curso_no_encontrado: 'No se encontró el curso',
  curso_no_encontrado_sub: 'Revisa que el enlace sea correcto, que el servidor de Django esté activo o vuelve a la lista de clases.',
  introduccion_curso: 'Introducción al curso',
  competencia_general: 'Competencia general',
  proxima_clase_titulo: 'Próxima clase',
  horario_semanal: 'Horario semanal',
  tareas_asignaciones: 'Tareas y asignaciones',
  sin_tareas_curso: 'Este curso todavía no tiene tareas.',
  materiales_apoyo: 'Materiales de apoyo',
  sin_materiales: 'Este curso todavía no tiene materiales.',
  vence: 'Vence {fecha}',
  vencida: 'Vencida',
  material_tipo_pdf: 'PDF',
  material_tipo_enlace: 'Enlace',
  material_tipo_video: 'Video',
  material_tipo_lectura: 'Lectura',

  // ---------- Apoyo ----------
  apoyo_titulo: 'Apoyo',
  apoyo_sub: 'Clases y cursos para reforzar tus materias y recursos de inclusión para toda la comunidad estudiantil.',
  apoyo_todos: 'Todos',
  apoyo_materias: 'Materias',
  apoyo_accesibilidad: 'Accesibilidad e inclusión',
  apoyo_tipo: 'Tipo',
  apoyo_tipo_todos: 'Clases y cursos',
  apoyo_tipo_clase: 'Clases',
  apoyo_tipo_curso: 'Cursos',
  recurso_clase: 'CLASE',
  recurso_curso: 'CURSO',
  dirigido_a: 'Dirigido a',
  duracion: 'Duración',
  materia_relacionada: 'Materia',
  apoyo_vacio: 'No hay recursos en esta categoría.',
  apoyo_nota_accesibilidad: 'Estos recursos ayudan a que todas las personas puedan participar en clase, por ejemplo, estudiantes con dificultades para comunicarse.',
  abrir_recurso: 'Abrir',

  // ---------- Configuración ----------
  ajustes_titulo: 'Configuración',
  ajustes_sub: 'Personaliza cómo se ve y cómo funciona Habemus Classroom.',
  ajustes_idioma: 'Idioma',
  ajustes_idioma_desc: 'Al cambiar el idioma la página se recargará para actualizar todos los textos.',
  idioma_es: 'Español',
  idioma_en: 'English',
  ajustes_apariencia: 'Apariencia',
  ajustes_modo_noche: 'Modo noche',
  ajustes_modo_noche_desc: 'Usa colores oscuros para cansar menos la vista.',
  ajustes_daltonismo: 'Colores para daltonismo',
  ajustes_daltonismo_desc: 'Cambia los colores por una paleta que se distingue mejor con daltonismo. Funciona también con el modo noche.',
  ajustes_activado: 'Activado',
  ajustes_desactivado: 'Desactivado',
  ajustes_vista_previa: 'Vista previa de los colores'
}

const en = {

  // ---------- Navigation ----------
  nav_inicio: 'Home',
  nav_horarios: 'Schedule',
  nav_clases: 'Classes',
  nav_cursos: 'Courses',
  nav_tareas: 'Assignments',
  nav_apoyo: 'Support',

  // ---------- Profile ----------
  perfil_abrir: 'Open profile menu',
  perfil_estudiante: 'Student',
  perfil_mi_perfil: 'My profile',
  perfil_configuracion: 'Settings',
  perfil_accesibilidad: 'Accessibility',
  perfil_cerrar_sesion: 'Log out',

  // ---------- General ----------
  cargando: 'Loading...',
  error_conexion: 'Could not connect to the Django server.',
  profesor: 'Teacher',
  progreso: 'Progress',
  horario: 'Schedule',
  modalidad: 'Format',
  aula: 'Room',
  hoy: 'Today',
  manana: 'Tomorrow',
  modalidad_presencial: 'In person',
  modalidad_en_linea: 'Online',

  // ---------- Home ----------
  saludo_manana: 'Good morning, {nombre}',
  saludo_tarde: 'Good afternoon, {nombre}',
  saludo_noche: 'Good evening, {nombre}',
  home_resumen: 'Here is a summary of your activities.',
  proxima_clase: 'NEXT CLASS',
  sin_proxima_clase: 'No classes scheduled',
  ver_clase: 'View class →',
  tarea_pendiente: 'PENDING ASSIGNMENT',
  sin_tareas_pendientes: 'You have no pending assignments',
  entrega: 'Due: {fecha}',
  ver_tarea: 'View assignment →',
  mis_cursos: 'My courses',
  ver_todos: 'See all →',
  curso_etiqueta: 'COURSE',
  continuar: 'Continue',

  // ---------- Classes ----------
  clases_titulo: 'My classes',
  clases_sub: 'Check your classes and open the content of each subject.',
  clase_etiqueta: 'CLASS',

  // ---------- Courses ----------
  cursos_titulo: 'My courses',
  cursos_sub: 'Browse all your courses and keep learning.',
  buscar_curso: 'Search course...',
  ordenar_nombre: 'Sort by name',
  ordenar_progreso: 'Sort by progress',
  entrar_curso: 'Go to course',
  sin_cursos: 'No courses found',
  sin_cursos_sub: 'Try a different search.',

  // ---------- Schedule ----------
  horarios_titulo: 'My class schedule',
  horarios_sub: 'Check your classes and plan your week.',

  // ---------- Assignments ----------
  tareas_organizacion: 'ORGANIZATION',
  mis_tareas: 'My assignments',
  tareas_sub: 'Check your activities and upcoming due dates.',
  mostrar: 'Show',
  todos_los_cursos: 'All courses',
  cargando_tareas: 'Loading assignments from Django...',
  calendario: 'CALENDAR',
  mes_anterior: 'Previous month',
  mes_siguiente: 'Next month',
  ir_a_hoy: 'Go to current month',
  materia: 'SUBJECT',
  actividad: 'ACTIVITY',
  fecha_entrega: 'DUE DATE',
  descripcion: 'Description',
  instrucciones: 'Instructions',
  ir_actividad: 'Go to activity →',
  cerrar_tarea: 'Close assignment',

  // ---------- Assignment detail ----------
  volver_tareas: '← Back to assignments',
  tarea_no_encontrada: 'Assignment not found',
  tarea_no_encontrada_sub: 'It may have been deleted, the link may be wrong or the Django server may be down.',
  estado_tarea: 'Status',
  estado_pendiente: 'Pending',
  estado_vencida: 'Overdue',
  entrega_archivos: 'File submission',
  subir_arrastra: 'Drag a file here',
  subir_o: 'or',
  subir_seleccionar: 'Choose file',
  subir_proximamente: 'File submission will be available soon.',
  subir_boton: 'Submit assignment',

  // ---------- Course page ----------
  volver_clases: '← Back to classes',
  curso_no_encontrado: 'Course not found',
  curso_no_encontrado_sub: 'Check that the link is correct, that the Django server is running, or go back to the list of classes.',
  introduccion_curso: 'Course introduction',
  competencia_general: 'General competence',
  proxima_clase_titulo: 'Next class',
  horario_semanal: 'Weekly schedule',
  tareas_asignaciones: 'Assignments and tasks',
  sin_tareas_curso: 'This course has no assignments yet.',
  materiales_apoyo: 'Support materials',
  sin_materiales: 'This course has no materials yet.',
  vence: 'Due {fecha}',
  vencida: 'Overdue',
  material_tipo_pdf: 'PDF',
  material_tipo_enlace: 'Link',
  material_tipo_video: 'Video',
  material_tipo_lectura: 'Reading',

  // ---------- Support ----------
  apoyo_titulo: 'Support',
  apoyo_sub: 'Classes and courses to reinforce your subjects, plus inclusion resources for the whole student community.',
  apoyo_todos: 'All',
  apoyo_materias: 'Subjects',
  apoyo_accesibilidad: 'Accessibility and inclusion',
  apoyo_tipo: 'Type',
  apoyo_tipo_todos: 'Classes and courses',
  apoyo_tipo_clase: 'Classes',
  apoyo_tipo_curso: 'Courses',
  recurso_clase: 'CLASS',
  recurso_curso: 'COURSE',
  dirigido_a: 'Intended for',
  duracion: 'Duration',
  materia_relacionada: 'Subject',
  apoyo_vacio: 'There are no resources in this category.',
  apoyo_nota_accesibilidad: 'These resources help everyone take part in class, for example students who have difficulty communicating.',
  abrir_recurso: 'Open',

  // ---------- Settings ----------
  ajustes_titulo: 'Settings',
  ajustes_sub: 'Customize how Habemus Classroom looks and works.',
  ajustes_idioma: 'Language',
  ajustes_idioma_desc: 'When you change the language the page reloads to update all the texts.',
  idioma_es: 'Español',
  idioma_en: 'English',
  ajustes_apariencia: 'Appearance',
  ajustes_modo_noche: 'Night mode',
  ajustes_modo_noche_desc: 'Use dark colors to reduce eye strain.',
  ajustes_daltonismo: 'Colorblind-friendly colors',
  ajustes_daltonismo_desc: 'Switches to a palette that is easier to tell apart with color blindness. It also works with night mode.',
  ajustes_activado: 'On',
  ajustes_desactivado: 'Off',
  ajustes_vista_previa: 'Color preview'
}

export const TEXTOS = { es, en }

/**
 * Devuelve el texto de una clave en el idioma indicado.
 * Si la clave no existe se muestra la clave misma.
 */
export function traducir(idioma, clave, variables = {}) {

  const texto = TEXTOS[idioma]?.[clave] ?? TEXTOS.es[clave] ?? clave

  return texto.replace(/\{(\w+)\}/g, (coincidencia, nombre) =>
    variables[nombre] !== undefined
      ? variables[nombre]
      : coincidencia
  )
}
