import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Track how the visitor is interacting, so focus rings only show for keyboard use.
// Only Tab counts: arrows and Escape browse the cards and close panels, and
// shouldn't ring the button a click left focused.
const setInput = (mode) => (document.documentElement.dataset.input = mode)
window.addEventListener('pointerdown', () => setInput('pointer'), true)
window.addEventListener('keydown', (e) => e.key === 'Tab' && setInput('keyboard'), true)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
