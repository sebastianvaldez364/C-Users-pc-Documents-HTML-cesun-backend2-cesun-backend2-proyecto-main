import './App.css'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Horarios from './pages/Horarios'
import Clases from './pages/Clases'
import CursoPagina from './pages/CursoPagina'
import Cursos from './pages/Cursos'
import Tareas from './pages/Tareas'
import TareaDetalle from './pages/TareaDetalle'
import Apoyo from './pages/Apoyo'
import Ajustes from './pages/Ajustes'

/**
 * Componente principal de Habemus Classroom.
 *
 * Define la estructura general de la aplicación y administra
 * las rutas principales mediante React Router.
 *
 * Las páginas se muestran debajo del Navbar sin necesidad
 * de recargar completamente el navegador.
 */
function App() {

  return (
    <BrowserRouter>

      {/* Barra de navegación visible en todas las páginas */}
      <Navbar />

      {/*
       * Sistema principal de rutas.
       *
       * Cada Route relaciona una URL con una página
       * específica de Habemus Classroom.
       */}
      <Routes>

        {/* Dashboard principal */}
        <Route path="/" element={<Home />} />

        {/* Horario semanal del estudiante */}
        <Route path="/horarios" element={<Horarios />} />

        {/* Clases en las que está inscrito el estudiante */}
        <Route path="/clases" element={<Clases />} />

        {/* Página principal de una materia */}
        <Route path="/clases/:id" element={<CursoPagina />} />

        {/* Lista completa de cursos */}
        <Route path="/cursos" element={<Cursos />} />

        {/* Calendario de tareas */}
        <Route path="/tareas" element={<Tareas />} />

        {/* Asignación completa con descripción y entrega */}
        <Route path="/tareas/:id" element={<TareaDetalle />} />

        {/* Clases y cursos de apoyo */}
        <Route path="/apoyo" element={<Apoyo />} />

        {/* Idioma, modo noche y colores para daltonismo */}
        <Route path="/configuracion" element={<Ajustes />} />

        {/* Cualquier otra dirección regresa al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
