import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { AppProviders } from '@/providers/app-providers'
import { router } from '@/routes/router'

//add esse import para: o Botão "Exportar PDF" mostrar o toast de sucesso - em Histórico
//isso tambem era um problema para: login, cadastro, etc.
import { ToastContainer } from '@/components/ui/ToastContainer'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
      <ToastContainer />
    </AppProviders>
  </StrictMode>,
)
