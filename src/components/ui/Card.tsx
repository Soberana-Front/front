// Importa React e utilitário
import * as React from "react";
import { cn } from "../../utils/cn";

// Props do Card com opções de padding e variantes
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;                       // Remove padding interno
  variant?: "default" | "bordered" | "shadow" | "none"; // Estilo do card
}

// Componente Card com variações de estilo
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, noPadding = false, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-white border border-gray-200 shadow-sm",
      bordered: "bg-white border border-gray-300",
      shadow: "bg-white shadow-lg",
      none: "bg-transparent border-0 shadow-none",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg",
          variantClasses[variant],
          noPadding && "p-0",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

// Cabeçalho do Card com padding opcional
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { noPadding?: boolean }
>(({ className, noPadding = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5",
      !noPadding && "p-6",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// Título do Card
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// Conteúdo do Card com padding opcional
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { noPadding?: boolean }
>(({ className, noPadding = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      !noPadding && "p-6 pt-0",
      className
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

// Exporta todos os subcomponentes
export { Card, CardHeader, CardTitle, CardContent };