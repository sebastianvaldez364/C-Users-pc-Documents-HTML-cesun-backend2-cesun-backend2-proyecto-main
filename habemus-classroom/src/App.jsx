import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import Login from './pages/Login'
import { useAuth } from './context/AuthContext'

function RutasProtegidas() {
  const { usuario, cargando } = useAuth()

  if (cargando) return <main aria-live="polite">Cargando sesion...</main>
  if (!usuario) return <Navigate to="/login" replace />

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/clases" element={<Clases />} />
        <Route path="/clases/:id" element={<CursoPagina />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/tareas" element={<Tareas />} />
        <Route path="/tareas/:id" element={<TareaDetalle />} />
        <Route path="/apoyo" element={<Apoyo />} />
        <Route path="/configuracion" element={<Ajustes />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

function App() {
  const { usuario, cargando } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={cargando ? <main>Cargando...</main> : usuario ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/*" element={<RutasProtegidas />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
