# Habemus Classroom

Plataforma de aula virtual de la materia **Desarrollo de Software Backend II**.

- **Backend:** Django + Django REST Framework (`habemus_backend/`)
- **Frontend:** React + Vite (`habemus-classroom/`)

## Cómo ejecutarlo

Se necesitan **dos terminales**: una para Django y otra para React.
Requisitos: Python 3.12 o superior y Node.js 20.19+ (o 22+).

### Terminal 1 · Backend

```bash
cd habemus_backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
# source venv/bin/activate

pip install -r ../requirements.txt
python manage.py migrate
python manage.py runserver
```

`migrate` es **obligatorio** la primera vez (y después de actualizar el
proyecto): crea las tablas nuevas de cursos, horarios, materiales y apoyo, y
carga los datos de ejemplo.

Comprueba que funciona abriendo <http://127.0.0.1:8000/api/cursos/>.

### Terminal 2 · Frontend

```bash
cd habemus-classroom
npm install
npm run dev
```

Abre <http://localhost:5173>.

## Funciones principales

| Sección | Qué hace |
|---|---|
| Inicio | Próxima clase y tarea pendiente (según la fecha y hora del dispositivo). El botón **Continuar** abre la página de la materia. |
| Clases | Lista de materias. **Ver clase** abre la página de la materia. |
| Página de la materia (`/clases/:id`) | Introducción, próxima clase y horario; a la derecha, tareas y asignaciones y materiales de apoyo. |
| Tareas | Calendario del mes actual (con navegación entre meses). **Ir a la actividad** abre la tarea completa. |
| Tarea (`/tareas/:id`) | Título, descripción, instrucciones y barra de entrega de archivos (todavía sin funcionamiento). |
| Apoyo | Clases y cursos para reforzar materias y de accesibilidad/inclusión. |
| Perfil → Configuración | Idioma (español/inglés, recarga la página), modo noche y colores para daltonismo. |

## API

| Método y ruta | Descripción |
|---|---|
| `GET /api/cursos/` | Cursos con sus horarios |
| `GET /api/cursos/<id>/` | Curso completo: introducción, materiales y tareas |
| `GET /api/tareas/` | Tareas (`?curso=<id>` filtra por materia) |
| `GET /api/tareas/<id>/` | Una tarea completa |
| `GET /api/apoyo/` | Recursos de apoyo (`?categoria=materias` o `accesibilidad`) |

Todas aceptan `?lang=es` o `?lang=en` para devolver los textos traducidos.

## Datos de ejemplo

Los cursos, horarios, materiales y recursos de apoyo se crean con las
migraciones (`cursos/migrations/0002_datos_iniciales.py`) y se pueden editar
desde el panel administrativo: <http://127.0.0.1:8000/admin/>.

Si no recuerdas la contraseña del administrador:

```bash
python manage.py changepassword admin
```

## Pruebas del backend

```bash
cd habemus_backend
python manage.py test
```
