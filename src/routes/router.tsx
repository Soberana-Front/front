import { createBrowserRouter } from "react-router";
import { AuthProvider } from "../contexts/AuthContext";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Layout } from "../components/layout/Layout";
import Login from "../pages/Login";

// Placeholder para Register (depois você cria)
const Register = () => <div className="p-4">Register Page</div>;

// Placeholder para a página inicial (protegida)
const Home = () => <div className="p-4">Bem-vindo! (Dashboard em breve)</div>;

// Componente wrapper para prover o contexto de autenticação
const AuthWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

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
      {
        element: <Layout />,
        children: [
          { index: true, element: <Home /> }, // Rota raiz "/"
          // Adicione outras rotas protegidas aqui conforme for criando
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>Página não encontrada</div>,
  },
]);