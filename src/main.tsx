import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css'
import './i18n/i18n'

const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
