import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/app.tsx'
import { Provider } from 'jotai'

import './styles/global-style.scss'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
