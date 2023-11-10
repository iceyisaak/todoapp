import { Provider } from 'jotai'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/app.tsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styles/global-style.scss'


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
