import { createBrowserRouter } from "react-router";
import { AuthProvider } from "../contexts/AuthContext";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Layout } from "../components/layout/Layout";
import Login from "../pages/Login";

import { App } from '@/App'
import { DashboardPage } from '@/pages/DashboardPage'
import { HomePage } from '@/pages/home-page'
import { NotFoundPage } from '@/pages/not-found-page'

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthWrapper>
        <Login />
      </AuthWrapper>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthWrapper>
        <Register />
      </AuthWrapper>
    ),
  },
  {
    // Rotas protegidas (exigem login)
    element: (
      <AuthWrapper>
        <ProtectedRoute />
      </AuthWrapper>
    ),
    children: [
      { index: true, Component: HomePage },
      { path: 'dashboard', Component: DashboardPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
  {
    path: "*",
    element: <div>Página não encontrada</div>,
  },
]);