import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/app.tsx'
import { Provider } from 'jotai'

import './styles/global-style.scss'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
)
