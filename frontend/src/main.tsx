import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
// Removed Vite default index.css to prevent layout overrides
import './custom.css'
import './green-theme.css'
import './custom-green.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App.tsx'

// Bootstrap JS for components like navbar collapse
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
