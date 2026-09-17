// Importa função para criar roteador
import { createBrowserRouter } from "react-router";

// Importa provedor de autenticação
import { AuthProvider } from "../contexts/AuthContext";

// Importa componentes de proteção de rotas
import { ProtectedRoute } from "../components/ProtectedRoute";
import { PublicRoute } from "../components/PublicRoute";

// Importa layout base
import { Layout } from "../components/layout/Layout";

// Importa páginas de autenticação
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

// Importa página principal do dashboard
import DashboardPage from "../pages/DashboardPage/DashboardPage";

// Importa páginas de clínicas e procedimentos
import { ClinicsPage } from "../pages/ClinicsPage/ClinicsPage";
import { ProceduresPage } from "../pages/ProceduresPage/ProceduresPage";

// importa página de histórico
import { History } from "../pages/history/History"; 

//importa página de detalhes do histórico (Issue #87)
import { HistoryDetail } from "../pages/history/HistoryDetail";

// Importa página de Nova Precificação
import NewPricingPage from "../pages/NewPricingPage/NewPricingPage";

// Importa página de detalhes da precificação
import PricingDetail from "../pages/PricingDetail/PricingDetail";

// Importa página de comparação
import ComparisonPage from "../pages/ComparisonPage/ComparisonPage";

<<<<<<< HEAD
// Placeholders restantes
const Historico = () => (
=======
/* virou uma página própria, então não precisa mais desse componente genérico
const Historico = () => (       
>>>>>>> 3f497bb7f4b5c073ee70b371442653a8b6009a9e
  <div className="p-4">Histórico (em breve)</div>
);*/

const Perfil = () => (
  <div className="p-4">Perfil (em breve)</div>
);

const Configuracoes = () => (
  <div className="p-4">Configurações (em breve)</div>
);

// Wrapper para injetar AuthProvider nas rotas
const AuthWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

// Cria o roteador com as rotas da aplicação
export const router = createBrowserRouter([
  {
    // Grupo de rotas públicas
    element: (
      <AuthWrapper>
        <PublicRoute />
      </AuthWrapper>
    ),
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
    ],
  },

  {
    // Grupo de rotas protegidas
    element: (
      <AuthWrapper>
        <ProtectedRoute />
      </AuthWrapper>
    ),
    children: [
      // Dashboard
      { index: true, element: <DashboardPage /> },
      { path: "dashboard", element: <DashboardPage /> },

      // Clínicas
      { path: "clinicas", element: <ClinicsPage /> },

      // Procedimentos
      { path: "procedimentos", element: <ProceduresPage /> },

<<<<<<< HEAD
      // Nova Precificação
      { path: "precificacao/nova", element: <NewPricingPage /> },
=======
      // Histórico — Issue #84
      { path: "historico", element: <History /> },

      // Histórico — Issue #87
      { path: "historico/:id", element: <HistoryDetail /> }, 

      // Nova Precificação — Issue #69
      {
        path: "precificacao/nova",
        element: <NewPricingPage />,
      },
>>>>>>> 3f497bb7f4b5c073ee70b371442653a8b6009a9e

      // Detalhamento da Precificação
      { path: "precificacao/:id", element: <PricingDetail /> },

      // 👇 Comparações FORA do Layout (a página já tem DashboardLayout)
      { path: "comparacoes", element: <ComparisonPage /> },

      // Demais páginas usando o Layout compartilhado
      {
        element: <Layout />,
        children: [
<<<<<<< HEAD
          { path: "historico", element: <Historico /> },
          { path: "perfil", element: <Perfil /> },
          { path: "configuracoes", element: <Configuracoes /> },
=======
          {
            path: "comparacoes",
            element: <Comparacoes />,
          },
          {
            path: "perfil",
            element: <Perfil />,
          },
          {
            path: "configuracoes",
            element: <Configuracoes />,
          },
>>>>>>> 3f497bb7f4b5c073ee70b371442653a8b6009a9e
        ],
      },
    ],
  },

  {
    // Rota 404
    path: "*",
    element: <div className="p-4">Página não encontrada</div>,
  },
]);