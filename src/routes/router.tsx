import { createBrowserRouter } from 'react-router'

import { App } from '@/App'
import { DashboardPage } from '@/pages/DashboardPage'
import { HomePage } from '@/pages/home-page'
import { NotFoundPage } from '@/pages/not-found-page'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: 'dashboard', Component: DashboardPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
