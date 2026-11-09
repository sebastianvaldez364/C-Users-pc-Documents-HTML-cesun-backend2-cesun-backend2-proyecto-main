import { useEffect, useState } from 'react'

function LectorVoz() {
  const [estado, setEstado] = useState('detenido')

  useEffect(() => {
    return () => window.speechSynthesis?.cancel()
  }, [])

  function leer() {
    if (!('speechSynthesis' in window)) {
      alert('Este navegador no admite lectura en voz alta.')
      return
    }

    window.speechSynthesis.cancel()
    const seleccion = window.getSelection()?.toString().trim()
    const contenido = seleccion || document.querySelector('main')?.innerText || document.body.innerText
    if (!contenido.trim()) return

    const lectura = new SpeechSynthesisUtterance(contenido)
    lectura.lang = document.documentElement.lang === 'en' ? 'en-US' : 'es-MX'
    lectura.rate = 1
    lectura.onend = () => setEstado('detenido')
    lectura.onerror = () => setEstado('detenido')
    window.speechSynthesis.speak(lectura)
    setEstado('leyendo')
  }

  function pausar() {
    if (estado === 'leyendo') {
      window.speechSynthesis.pause()
      setEstado('pausado')
    } else if (estado === 'pausado') {
      window.speechSynthesis.resume()
      setEstado('leyendo')
    }
  }

  function detener() {
    window.speechSynthesis.cancel()
    setEstado('detenido')
  }

  return (
    <div className="lector-voz" role="group" aria-label="Controles de lectura en voz alta">
      <button type="button" onClick={leer} aria-label="Leer contenido de la pagina">Leer en voz alta</button>
      <button type="button" onClick={pausar} disabled={estado === 'detenido'} aria-label={estado === 'pausado' ? 'Reanudar lectura' : 'Pausar lectura'}>
        {estado === 'pausado' ? 'Reanudar' : 'Pausar'}
      </button>
      <button type="button" onClick={detener} disabled={estado === 'detenido'} aria-label="Detener lectura">Detener</button>
      <span className="lector-estado" aria-live="polite">{estado === 'leyendo' ? 'Leyendo' : estado === 'pausado' ? 'Lectura pausada' : ''}</span>
    </div>
  )
}

export default LectorVoz
