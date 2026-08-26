import { createBrowserRouter } from "react-router";
import { AuthProvider } from "../contexts/AuthContext";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { PublicRoute } from "../components/PublicRoute";
import { Layout } from "../components/layout/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Placeholder para a página inicial (protegida)
const Home = () => <div className="p-4">Bem-vindo! (Dashboard em breve)</div>;

// Componente wrapper para prover o contexto de autenticação
const AuthWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

export const router = createBrowserRouter([
  {
    // Rotas públicas (acessíveis sem login)
    element: (
      <AuthWrapper>
        <PublicRoute />
      </AuthWrapper>
    ),
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      // Adicione outras rotas públicas aqui (ex: forgot-password, reset-password)
    ],
  },
  {
    // Rotas protegidas (exigem login)
    element: (
      <AuthWrapper>
        <ProtectedRoute />
      </AuthWrapper>
    ),
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: "dashboard", element: <Home /> },
          // Adicione outras rotas protegidas aqui (clinicas, procedimentos, etc.)
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>Página não encontrada</div>,
  },
]);