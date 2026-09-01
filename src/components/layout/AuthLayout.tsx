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
    <div className="auth-page">
      
      {/* Lado esquerdo com gradiente (visível apenas em desktop) */}
      <div className="auth-brand">
        
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
            <h1 className="auth-brand-title">Soberana</h1>
            <p className="auth-brand-slogan">
              Sistema de precificação odontológica com inteligência artificial
            </p>
          </div>
        </div>
      </div>

      {/* Lado direito com o formulário centralizado */}
      <div className="auth-form-side">
        <div className="mx-auto w-full max-w-md">
          
          {/* Logo visível apenas em mobile */}
          <div className="auth-mobile-logo">
            <h1 className="auth-mobile-title">Soberana</h1>
          </div>

          {/* Título e subtítulo da página */}
          {(title || subtitle) && (
            <div className="auth-header">
              {title && (
                <h2 className="auth-title">{title}</h2>
              )}
              {subtitle && (
                <p className="auth-subtitle">{subtitle}</p>
              )}
            </div>
          )}

          {/* Card branco com o conteúdo do formulário */}
          <div className={cn("auth-card", className)}>
            {children}
          </div>

          {/* Rodapé com direitos autorais */}
          {showFooter && (
            <div className="auth-footer-text">
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