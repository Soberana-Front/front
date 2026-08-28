// Importa componente para renderizar rotas filhas
import { Outlet } from "react-router";
// Importa barra lateral de navegação
import { Sidebar } from "./Sidebar";
// Importa cabeçalho do layout
import { LayoutHeader } from "./Header";

// Layout base para páginas protegidas (sidebar + header + conteúdo)
export const Layout = () => {
  return (
    // Container principal em tela cheia com fundo cinza
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar fixa na esquerda */}
      <Sidebar />
      {/* Área principal com header fixo e conteúdo rolável */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Cabeçalho fixo no topo */}
        <LayoutHeader />
        {/* Área de conteúdo com scroll e padding */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet /> {/* Renderiza a página atual (dashboard, clínicas, etc.) */}
        </main>
      </div>
    </div>
  );
};