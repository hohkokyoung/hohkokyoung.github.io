import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Track how the visitor is interacting, so focus rings only show for keyboard use.
const setInput = (mode) => () => (document.documentElement.dataset.input = mode)
window.addEventListener('pointerdown', setInput('pointer'), true)
window.addEventListener('keydown', setInput('keyboard'), true)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
