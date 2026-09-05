// Importa função para criar roteador
import { createBrowserRouter } from "react-router";
// Importa provedor de autenticação
import { AuthProvider } from "../contexts/AuthContext";
// Importa componentes de proteção de rotas
import { ProtectedRoute } from "../components/ProtectedRoute";
import { PublicRoute } from "../components/PublicRoute";
import { ClinicsPage } from "../pages/ClinicsPage/ClinicsPage";
// Importa layout base
import { Layout } from "../components/layout/Layout";
// Importa páginas de autenticação
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
// Importa página principal do dashboard
import DashboardPage from "../pages/DashboardPage/DashboardPage";

import { ProceduresPage } from "../pages/ProceduresPage/ProceduresPage";  //issue #52

// Placeholders para páginas ainda não implementadas
//const Clinicas = () => <div className="p-4">Clínicas (em breve)</div>; não mais necessaria
/*Mesma mudança estrutural que fizemos pra /clinicas: o Procedimentos hoje está dentro do grupo <Layout>, mas a ProceduresPage usa DashboardLayout (que já tem sua própria sidebar) — então precisa mover pra fora, junto de dashboard e clinicas.
Remover esta linha (placeholder): 
const Procedimentos = () => <div className="p-4">Procedimentos (em breve)</div>;*/
const Comparacoes = () => <div className="p-4">Comparações (em breve)</div>;
const Historico = () => <div className="p-4">Histórico (em breve)</div>;
const Perfil = () => <div className="p-4">Perfil (em breve)</div>;
const Configuracoes = () => <div className="p-4">Configurações (em breve)</div>;

// Wrapper para injetar AuthProvider nas rotas
const AuthWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

// Cria o roteador com as rotas da aplicação
export const router = createBrowserRouter([
  {
    // Grupo de rotas públicas (acessíveis sem login)
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
    // Grupo de rotas protegidas (exigem autenticação)
    element: (
      <AuthWrapper>
        <ProtectedRoute />
      </AuthWrapper>
    ),
    children: [
      // Dashboard possui seu próprio DashboardLayout
    { index: true, element: <DashboardPage /> },
    { path: "dashboard", element: <DashboardPage /> },
    { path: "clinicas", element: <ClinicsPage /> },   
    { path: "procedimentos", element: <ProceduresPage /> },
    // ← movida pra cá, fora do <Layout>
    // Demais páginas continuam utilizando o Layout compartilhado
   {
     element: <Layout />,
     children: [
    //{ path: "clinicas", element: <Clinicas /> },
   // { path: "procedimentos", element: <Procedimentos /> }, "procedimentos" removido daqui
    { path: "comparacoes", element: <Comparacoes /> },
    { path: "historico", element: <Historico /> },
    { path: "perfil", element: <Perfil /> },
    { path: "configuracoes", element: <Configuracoes /> },
     ],
     },
    ],
  },
  {
    // Rota 404 - página não encontrada
    path: "*",
    element: <div className="p-4">Página não encontrada</div>,
  },
]);