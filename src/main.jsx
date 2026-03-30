import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Test from './test.jsx'

// --- Redirect static paths (reich, stadler) for local dev server ---
if (window.location.pathname === '/reich' || window.location.pathname === '/reich/' || 
    window.location.pathname === '/stadler' || window.location.pathname === '/stadler/') {
    window.location.replace(window.location.pathname + (window.location.pathname.endsWith('/') ? '' : '/') + 'index.html');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
