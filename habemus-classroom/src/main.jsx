import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AjustesProvider } from './context/AjustesProvider.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AjustesProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AjustesProvider>
  </StrictMode>,
)
