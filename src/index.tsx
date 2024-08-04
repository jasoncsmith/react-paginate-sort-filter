import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import './styles/tailwind/input.css'
import './styles/main.scss'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
