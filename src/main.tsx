import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import '@/lib/i18n'
import '@/styles/globals.css'

// Recuperacion tras un deploy: si una pestaña quedo abierta con la version
// anterior del sitio, al navegar intenta cargar chunks con hash viejo que ya
// no existen y el clic "no hace nada" (la URL cambia pero la pagina no).
// Vite emite `vite:preloadError` en ese caso: recargamos una unica vez para
// traer la version nueva. El flag de sesion evita un bucle de recargas si el
// error fuera por red y no por deploy.
window.addEventListener('vite:preloadError', (event) => {
  if (sessionStorage.getItem('recargado-por-deploy')) return
  sessionStorage.setItem('recargado-por-deploy', '1')
  event.preventDefault()
  window.location.reload()
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
