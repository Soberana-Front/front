// Importa tipos e utilitário de classes CSS
import { ReactNode } from "react";
import { cn } from "../../utils/cn";

// Props do layout de autenticação
export interface AuthLayoutProps {
  children: ReactNode;           // Conteúdo do formulário
  title?: string;                // Título da página
  subtitle?: string;             // Subtítulo da página
  showFooter?: boolean;          // Exibe rodapé
  footerContent?: ReactNode;     // Conteúdo customizado do rodapé
  className?: string;            // Classes CSS adicionais
}

// Layout para páginas de autenticação (Login, Register, etc.)
export const AuthLayout = ({
  children,
  title,
  subtitle,
  showFooter = true,
  footerContent,
  className,
}: AuthLayoutProps) => {
  return (
    // Container principal com altura total e fundo cinza
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Lado esquerdo com gradiente (visível apenas em desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-indigo-600 to-indigo-800">
        
        {/* Elementos decorativos: círculos com blur */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-white/10 rounded-full" />
          </div>
        </div>

        {/* Nome e slogan da marca */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-8 text-white">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold mb-4">Soberana</h1>
            <p className="text-lg text-indigo-100">
              Sistema de precificação odontológica com inteligência artificial
            </p>
          </div>
        </div>
      </div>

      {/* Lado direito com o formulário centralizado */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          
          {/* Logo visível apenas em mobile */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-600">Soberana</h1>
          </div>

          {/* Título e subtítulo da página */}
          {(title || subtitle) && (
            <div className="text-center mb-8">
              {title && (
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
              )}
              {subtitle && (
                <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
              )}
            </div>
          )}

          {/* Card branco com o conteúdo do formulário */}
          <div className={cn("bg-white p-8 rounded-lg shadow-sm border border-gray-200", className)}>
            {children}
          </div>

          {/* Rodapé com direitos autorais */}
          {showFooter && (
            <div className="mt-6 text-center text-sm text-gray-500">
              {footerContent || (
                <p>
                  &copy; {new Date().getFullYear()} Soberana. Todos os direitos reservados.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};